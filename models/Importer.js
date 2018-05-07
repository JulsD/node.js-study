const csvtojson = require('csvtojson')

class Importer {
    constructor() {}
    
    convert(path) {
        csv()
        .fromFile(path)
        .on('json', (jsonObj) => {
            return jsonObj;
        })
        .on('done',(error) => {
            console.log(error);
        })
    }
    
    import(path) {
        return new Promise(this.convert(path));
    }

    importSync(path) {
        return this.convert(path);
    }
}

export default Importer;