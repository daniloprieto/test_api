const { faker } = require('@faker-js/faker');

class Productsservice {

    constructor(){
        this.products = [];
        this.generate();
    }

    generate(limit = 1000){
        for (let index = 0; index < limit ; index++) {
            this.products.push({
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                price: parseInt(faker.commerce.price()),
                image: faker.image.imageUrl(),
            });   
        };
    }

    async create(data){

        const newProduct = {
            id: faker.datatype.uuid(),
            ...data
        };

        this.products.push(newProduct);

        return newProduct;
    }

    async get(limit = this.products.length){ 
        const products = [];

        return new Promise((resolve,reject) => {
            setTimeout(() => {
                for (let index = 0; index < limit; index++) {
                    if(this.products[index]) products.push(this.products[index]); 
                };
            
                resolve(products); 
                
            }, 4000);
        })

    };

    async getById(id){ 
        return this.products.find(item => item.id === id);
    }

    async update(id, changes){
        const index = this.products.findIndex(item => item.id === id);

        if(index === -1) throw new Error('Product not found');

        const product = this.products[index];
        
        this.products[index] = {
            ...product, 
            ...changes
        }; 

        return this.products[index];

    }

    async delete(id){
        const index = this.products.findIndex(item => item.id === id);

        if(index === -1) throw new Error('Product not found');
        
        this.products.splice(index,1); 

        return { id };
    }

}

module.exports = Productsservice;