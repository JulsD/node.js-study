import { find, floor } from 'lodash';

class Product {
    constructor(products) {
        this.products = products? products : [];
    }

    add(product) {
        let newId = this.createId();
        product.id = newId;
        return this.products.push(product);
    }

    get(productID) {
        let product = find(this.products, function(o){ return o.id == productID });
        if(product) {
            return product;
        } else {
            return {"product": "doesn't exist"}
        }
    }

    fetchAll() {
        return this.products;
    }

    createId() {
        let newId = floor(Math.random()*10);
        if(find(this.products, { id: newId})) {
            this.createId();
        }
        return newId;
    }
}

export default Product;