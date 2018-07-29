import { find, uniqueId } from 'lodash';

class Product {
    constructor(products) {
        this.products = products? products : [];
    }

    add(product) {
        this.createId();
        product.id = this.newId;
        this.products.push(product);
        return product;
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
        this.newId = uniqueId();
        console.log('newId', this.newId);
        if(find(this.products, { id: this.newId})) {
            this.createId();
        }
    }
}

export default Product;