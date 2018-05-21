const program = require('commander');

program
  .option('-a, --action', 'Runs some action')
  .parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
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