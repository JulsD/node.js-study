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
  
function addWarning(txt) {
    let warning = colors.red('\n  Wrong input: module was called without arguments. \n');
    return warning + txt;
} 

function reverse(str) { 
    /* ... */
}
function transform(str) { 
    /* ... */
}
function outputFile(filePath) { 
    /* ... */
}
function convertFromFile(filePath) { 
    /* ... */
}
function convertToFile(filePath) { 
    /* ... */
}