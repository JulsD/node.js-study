const program = require('commander');
var colors = require('colors');

program
    .version('0.0.1')
    .usage('[options] <keywords>')
    .option('-a, --action <type>', 'Runs action of a given type')
    .option('-f, --file <filePath>', 'Used to pass file to some actions')
    .option('-p, --path <path>', 'Used to pass dir path to cssBundle action')
    .parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp(addWarning);
} 
else if (program.action == 'reverse') {
    let str = process.argv[3];
    if (typeof str === 'string') {
        reverse(str);
    } else {
        console.log('This action needs a string');
    }
} 
else if (program.action == 'transform') {
    let str = process.argv[3];
    if (typeof str === 'string') {
        transform(str);
    } else {
        console.log('This action needs a string');
    }
}
else if (program.action == 'outputFile') {
    if(program.file) {
        outputFile(program.file);
    } else {
        console.log('File path should be spesified');
    }
}
else if (program.action == 'convertFromFile') {
    if(program.file) {
        convertFromFile(program.file);
    } else {
        console.log('File path should be spesified');
    }
}
else if (program.action == 'convertToFile') {
    if(program.file) {
        convertToFile(program.file);
    } else {
        console.log('File path should be spesified');
    }
} else {
    console.log('Action doesn\'t exist');
}

  
function addWarning(txt) {
    let warning = colors.red('\n  Wrong input: module was called without arguments. \n');
    return warning + txt;
} 


// list of actions:
function reverse(str) { 
    // process.stdin.pipe(process.stdout);
    // let stdin = process.stdin, stdout = process.stdout;

    // stdin.resume();
    // stdin.setEncoding('utf8');

    // stdin.on('data', function(str) {
    //     stdout.write(str);
    // });
    console.log('reverse', str);
}
function transform(str) { 
    console.log('transform');
}
function outputFile(filePath) { 
    console.log('outputFile:', filePath);
}
function convertFromFile(filePath) { 
    console.log('convertFromFile:', filePath);
}
function convertToFile(filePath) { 
    console.log('convertToFile:', filePath);
}