const program = require ('commander');
const colors = require ('colors');
const fs = require ('fs');
const path = require ('path');

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
else if (program.action == 'convertFromFile') { checkFilePath(convertFromFile) }
else if (program.action == 'convertToFile') { checkFilePath(convertToFile) }
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

function checkFilePath(fn) {
    let filePathRegexp = new RegExp('^(.*/)?(?:$|(.+?)(?:(\.[^.]*$)|$))');
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
    console.log('convertFromFile:', filePath);
}
function convertToFile(filePath) { 
    console.log('convertToFile:', filePath);
}