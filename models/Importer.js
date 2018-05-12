var csvjson = require('csvjson');
var fs = require('fs');

class Importer {
    constructor() {}

    convert(file_data) {
        return csvjson.toObject(file_data);
    }
    
    import(path) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, { encoding : 'utf8'}, (err, file_data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve (this.convert(file_data));
                }
            })}
        );
    }

    importSync(path) {
        let file_data = fs.readFileSync(path, { encoding : 'utf8'});
        return this.convert(file_data);
    }
}

export default Importer;