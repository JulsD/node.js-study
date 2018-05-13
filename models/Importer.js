const csvjson = require('csvjson');
const fs = require('fs');

class Importer {
    constructor() {}

    convert(fileData) {
        return csvjson.toObject(fileData);
    }
    
    import(path) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, { encoding : 'utf8'}, (err, fileData) => {
                if (err) {
                    reject(err)
                } else {
                    resolve (this.convert(fileData));
                }
            })}
        );
    }

    importSync(path) {
        let fileData = fs.readFileSync(path, { encoding : 'utf8'});
        return this.convert(fileData);
    }
}

export default Importer;