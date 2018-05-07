const Converter = require("csvtojson").Converter;

class Importer {
    constructor() {}
    
    convert(path) {
        let converter = new Converter({});

        converter.fromFile(path,function(err,result) {
            if(err){
                console.log("An Error Has Occured");
                console.log(err);  
            } 
            return result;
        });
    }
    
    import(path) {
        return new Promise(this.convert(path));
    }

    importSync(path) {
        return this.convert(path);
    }
}

export default Importer;