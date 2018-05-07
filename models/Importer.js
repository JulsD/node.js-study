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

    }

    importSync(path) {
        
    }
}

export default Importer;