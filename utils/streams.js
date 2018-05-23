const program = require ('commander');
const colors = require ('colors');
const fs = require ('fs');
const path = require ('path');
const csvjson = require('csvjson');
const request = require('request');

program
    .version('0.0.1')
    .usage('[options] <keywords>')
    .option('-a, --action <type>', 'Runs action of a given type')
    .option('-f, --file <filePath>', 'Used to pass file to some actions')
    .option('-p, --path <path>', 'Used to pass dir path to cssBundle action')
    .arguments('[str]')
    .parse(process.argv);
    
if (!process.argv.slice(2).length) {
    program.outputHelp(addWarning);
} 
else if (program.action == 'reverse') { checkArgsStr(reverse) }
else if (program.action == 'transform') { checkArgsStr(transform) }
else if (program.action == 'outputFile') { checkFilePath(outputFile) }
else if (program.action == 'convertFromFile') { checkFilePath(convertFromFile, {csv: true}) }
else if (program.action == 'convertToFile') { checkFilePath(convertToFile, {csv: true}) }
else if (program.action == 'cssBundle') { checkDirPath(cssBundle) }
else console.log('Action doesn\'t exist')

// Util functions:
function addWarning(txt) {
    let warning = colors.red('\n  Wrong input: module was called without arguments. \n');
    return warning + txt;
} 

function checkArgsStr(fn) {
    if (program.args.length > 0) {
        fn(program.args.join(' '));
    } else {
        console.error('This action needs a string argument.');
        process.exit(1);
    }
} 

function checkFilePath(fn, type) {
    let anyFilePathRegexp = new RegExp('^(.*/)?(?:$|(.+?)(?:(\.[^.]*$)|$))');
    let csvFilePathRegexp = new RegExp('^.*\.csv$');
    let filePathRegexp = type && type.csv ? csvFilePathRegexp : anyFilePathRegexp;
    if(program.file && filePathRegexp.test(program.file)) {
        fn(program.file);
    } else if (program.file && !filePathRegexp.test(program.file)) {
        console.error('Check the path to the file.');
        process.exit(1);
    } else {
        console.error('File path should be spesified.');
        process.exit(1);
    }
} 

function checkDirPath(fn) {
    let pathRegexp = new RegExp('^(.+)/([^/]+)$');
    if(program.path && pathRegexp.test(program.path)) {
        fn(program.path);
    } else if (program.path && !pathRegexp.test(program.path)) {
        console.error('Check the path to the dir.');
        process.exit(1);
    } else {
        console.error('Dir path should be spesified.');
        process.exit(1);
    }
} 

// lLst of actions:
function reverse(str) {
    process.stdin.write(str);
    process.stdout.on('data', (str) => process.stdout.write(str));
    process.stdin.end();
}
function transform(str) {
    const { Transform } = require('stream');
    const upperCaseTr = new Transform({
        transform(chunk, encoding, callback) {
            this.push(chunk.toString().toUpperCase());
            callback();
        }
    });

    process.stdin.pipe(upperCaseTr).pipe(process.stdout);
}
function outputFile(filePath) {
    const reader = fs.createReadStream(path.join(__dirname, filePath));
    reader.on('error', (error) => { console.log(error) });
    reader.pipe(process.stdout);
}
function convertFromFile(filePath) {
    const reader = fs.createReadStream(path.join(__dirname, filePath));
    const toObject = csvjson.stream.toObject();
    const stringify = csvjson.stream.stringify();

    reader.on('error', (error) => { console.log(error) });

    reader.pipe(toObject).pipe(stringify).pipe(process.stdout);
}
function convertToFile(filePath) { 
    const fileName = path.basename(filePath).slice(0, -4) + '.json';
    const dirPath = path.resolve(__dirname, (path.dirname(filePath)));
    const reader = fs.createReadStream(path.join(__dirname, filePath));
    const writer = fs.createWriteStream(dirPath + '/' + fileName);
    const toObject = csvjson.stream.toObject();
    const stringify = csvjson.stream.stringify();

    reader.on('error', (error) => { console.log(error) });
    writer.on('error', (error) => { console.log(error) });

    reader.pipe(toObject).pipe(stringify).pipe(writer);
}
function cssBundle(dirPath) {
    const CombinedStream = require('combined-stream');
    let combinedStream = CombinedStream.create();

    const filePath = path.join(dirPath, 'bundle.css');
    const writer = fs.createWriteStream(filePath);

    writer.on('error', (error) => { console.log(error) });

    fs.readdir(dirPath, (err, files) => {
        if(err) throw err;
        if (files && files.length > 0) {
            let cssSrt = files.filter((file) => {
                return file.slice(-3) == 'css'}
            ).map(file => {
                let readStream = fs.createReadStream(path.join(dirPath, file));
                readStream.on('error', (error) => { console.log(error) });
                combinedStream.append(readStream);
                return file;
            });
        }
    });

    combinedStream.append(request
        .get('https://epa.ms/nodejs18-hw3-css')
        .on('response', function(response) {
          console.log(response.statusCode)
          console.log(response.headers['content-type'])
          console.log(response.data);
        })
        .on('error', function(err) {
            console.log(err)
        }))

    combinedStream.pipe(writer);
}