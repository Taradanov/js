'use strict'
const product = {
    product_id: null,
    name: null,
    price: null,
    init(name, price = 0) {
        this.name = name;
        this.setPrice(price);
        this.product_id = UUIDGenerator.generateNewKey();
    },
    setPrice(price) {
        this.price = price;
    },
    getPrice() {
        return this.price;
    },
    getName() {
        return this.name;
    },
    getUUID() {
        return this.product_id;
    }
};
// Справочник номенклатура УИД и Имя номенклатуры уникальные,
// Получить позицию по наименованию, получить позицию по УИДу, Добавить по имени, Удалить из справочника
const allProducts = {
    products: new Map(),
    addProductToProducts(product) {
        if (this.productIsAlreadyExist(product)) {
            throw 'Продукт с таким именем или UUID уже добавлен в справочник'
        }
        this.products.set(product.product_id, product);
    },

    productIsAlreadyExist(product) {
        return this.productIsAlreadyExistByName(product.name) || this.productIsAlreadyExistByUUID(product.product_id);
    },

    productIsAlreadyExistByUUID(UUID) {
        return this.products.has(UUID)
    },
    productIsAlreadyExistByName(name) {
        for (let product of this.products.values()) {
            if (product.name === name) {
                return true;
            }
        }
        return false;
    },
    showProducts() {

        const parent = document.getElementById("product-list");
        const child = document.querySelectorAll(".product-element");
        for (const childKey of child) {
            parent.removeChild(childKey);
        }

        for (const productsKey of this.products) {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product-element');
            const name = interfaceDOM.addChild(productsKey[1].getName(), "input,form-control");
            const UUID = interfaceDOM.addChild(productsKey[1].getUUID(), "input,form-control");
            productDiv.appendChild(name);
            productDiv.appendChild(UUID);
            parent.appendChild(productDiv);
        }

    }
};

const interfaceDOM = {
    addChild(valInnerHTML = "", classes = "") {
        const child = document.createElement('div');
        child.innerHTML = valInnerHTML;
        for (const class_ of classes.split(",")) {
            child.classList.add(class_);
        }
        return child;
    }
};

//генератор уникальных идентификаторов http://jdevnotes.blogspot.com/2010/03/guid-javascript.html
const UUIDGenerator = {
    generateNewKey() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }).toUpperCase();
    },
};
// добавить остаток на склад, снять остаток со склада, проверить наличие на складе
const storehouse = {
    name: null,
    restOfGoods: new Map(),
    // init() {}
    addProductToStorehouse(product_id, count) {
        this.restOfGoods.set(product_id, this.getRestOfGood(product_id) + count);
    },

    getRestOfGood(product_id) {
        if (this.restOfGoods.has(product_id)) {
            return this.restOfGoods.get(product_id)
        }
        return 0;
    },

    goodsEnough(product_id, count) {
        return this.getRestOfGood(product_id) - count > 0;
    },

    removeProductFromStoreHouse(product_id, count) {
        if (this.goodsEnough(product_id, count)) {
            this.addProductToStorehouse(product_id, -count)
        } else {
            throw "недостаточно товара на складе";
        }
    }
};

document.getElementById("buttonAddProduct").addEventListener('click', () => {
    let productName = document.getElementById("inputNameForProduct").value;
    let newProduct = {};
    Object.assign(newProduct, product);
    newProduct.init(productName, 100);
    allProducts.addProductToProducts(newProduct);
    allProducts.showProducts();
})