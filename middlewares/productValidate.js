import Ajv from 'ajv';
const ajv = Ajv({allErrors: true, removeAdditional: 'all'});
const newProductSchema = {
    "title": "new product",
    "description": "Properties required to create new product", 
    "type": "object",
    "properties": {
        "name": { 
            "type": "string",
            "description": "name of the new product"
        },
        "color": { 
            "type": "string",
            "description": "color of the new product"
        },
    }
}

ajv.addSchema(newProductSchema, 'new-product');

function errorResponse(schemaErrors) {
    let errors = schemaErrors.map((error) => {
        return {
            path: error.dataPath,
            message: error.message
        };
    })
    return {
        status: 'faild',
        errrors: errors
    };
}

const validateProductSchema = (req, res, next) => {
    let isValid = ajv.validate(newProductSchema, req.body);
    if(!isValid) {
        res.status(400).json(errorResponse(ajv.errors));
    } else {
        next();
    }
}

export default validateProductSchema;