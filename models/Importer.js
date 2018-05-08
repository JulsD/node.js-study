const csvtojson = require('csvtojson')

class Importer {
    constructor() {}
    
    convert(path) {
        return new Promise(resolve, reject) {
            csv()
            .fromFile(path)
            .on('json', (jsonObj) => {
                resolve(jsonObj);
            })
            .on('done',(error) => {
                console.log(error);
            })
            .on('error', error => {
                reject(error);
            } )
        }            
    }
    
    import(path) {
        return this.convert(path);
    }

    importSync(path) {
        return this.convert(path);
    }
}

export default Importer;