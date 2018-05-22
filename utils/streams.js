const program = require('commander');
var colors = require('colors');

program
    .version('0.0.1')
    .usage('[options] <keywords>')
    .option('-a, --action <type>', 'Runs action of given type')
    .option('-f, --file <filePath>', 'Opens a file by given path')
    .parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp(addWarning);
} 
else if (program.action == 'reverse') {reverse();} 
else if (program.action == 'transform') {transform();}
else if (program.action == 'filePath') {filePath();} 
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
    console.log('reverse');
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