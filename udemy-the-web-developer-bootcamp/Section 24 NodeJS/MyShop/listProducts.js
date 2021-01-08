var faker = require('faker');

for (var i=0; i<10; i++){
    console.log((i+1) + ". " + "Product name ($): " + faker.commerce.productName() + "($" + faker.commerce.price() + ")");
}
