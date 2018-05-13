import csvjson from 'csvjson';
import { readFileSync, readFile } from 'fs';

class Importer {
    listen(dirWatcher, cb){
        dirWatcher.on('changed', (path) => {
            this.import(path)
                .then((data) => cb(null, data))
                .catch((error) => cb(error));
        });
    }

    convert(fileData) {
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