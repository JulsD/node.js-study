import csvjson from 'csvjson';
import { readFileSync, readFile } from 'fs';

class Importer {
    convert(fileData) {
        console.log('fileData is here: ', fileData);
        
        return csvjson.toObject(fileData);
    }
    
    import(path) {
        return new Promise((resolve, reject) => {
            readFile(path, { encoding: 'utf8'}, (err, fileData) => {
                if (err) reject(err);
                resolve(this.convert(fileData));
            })}
        );
    }

    importSync(path) {
        return this.convert(readFileSync(path, { encoding : 'utf8'}));
    }
}

export default Importer;