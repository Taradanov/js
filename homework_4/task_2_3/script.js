// Продолжить работу с интернет-магазином:
//
// В прошлом домашнем задании вы реализовали корзину на базе массивов. Какими объектами можно заменить их элементы?
// Реализуйте такие объекты.
//     Перенести функционал подсчета корзины на объектно-ориентированную базу.
// (*) Подумать над глобальными сущностями. К примеру, сущность «Продукт» в интернет-магазине
// актуальна не только для корзины, но и для каталога. Стремиться нужно к тому,
// чтобы объект «Продукт» имел единую структуру для различных модулей сайта,
// но в разных местах давал возможность вызывать разные методы.

//Добавить в корзину, удалить из корзины, изменить количество в корзине, получить сумму корзины,
// получить количество корзины
'use strict'

// Собственно корзина,
// Добавить в корзину, удалить из корзины, очистить корзину, рассчитать сумму корзины,
// рассчитать количество мест корзины
const cart = {
    cartPositions: new Map(),
    _id: UUIDGenerator.generateNewKey(),

    clearCart() {
        this.cartPositions.clear()
    },

    addPositionToCart(anyCartPosition, count = 1) {
        if (!this.productIsAlreadyInTheCart()) {
            this.cartPositions.set(anyCartPosition.get_id(), anyCartPosition);
            const position = anyCartPosition;
        } else {
            const position = this.cartPositions.get()
        }
   },
    productIsAlreadyInTheCart(anyCartPosition) {
        return this.cartPositions.has(anyCartPosition.get_id());
    }
};

// Описывает строку корзины
//
const cartPosition = {
    _product_id: null,
    productName: null,
    price: null,
    quantity: null,
    sum: null,

    get_id() {
        return this._product_id
    }
};


//Получить цену товара+, установить цену товара+, получить id товара+, получить представление товара+
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

//генератор уникальных идентификаторов http://jdevnotes.blogspot.com/2010/03/guid-javascript.html
const UUIDGenerator = {
    generateNewKey() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }).toUpperCase();
    },
};

// Создать товар, если такой товар НЕ существует в перечне продуктов
let newProduct1 = {};
Object.assign(newProduct1, product);
newProduct1.init('Товар дешевый, высоколиквидный', 99.99);
allProducts.addProductToProducts(newProduct1);
try {
    let newProduct2 = {};
    Object.assign(newProduct2, product);
    newProduct2.init('Товар дешевый, высоколиквидный', 99.99);
    allProducts.addProductToProducts(newProduct2)
} catch (e) {
    console.error('невозможно добавить товар с одинаковым наименованием')
}

//Добаим ещё пару
let newProduct2 = {};
Object.assign(newProduct2, product);
newProduct2.init('Товар дорогой, высоколиквидный', 888888.00);
allProducts.addProductToProducts(newProduct2);

let newProduct3 = {};
Object.assign(newProduct3, product);
newProduct3.init('Товар дорогой, низколиквидный', 999999.00);
allProducts.addProductToProducts(newProduct3);

// Поступило на склад
storehouse.addProductToStorehouse(newProduct1.product_id, 5);
storehouse.addProductToStorehouse(newProduct1.product_id, 50);
storehouse.addProductToStorehouse(newProduct2.product_id, 10);
storehouse.addProductToStorehouse(newProduct3.product_id, 1);

//Недостача)))
storehouse.removeProductFromStoreHouse(newProduct1.product_id, 1);

// Списать то, чего нет
try {
    storehouse.removeProductFromStoreHouse(newProduct3, 100);
}catch (e){
    console.error( 'Недостаточно товара на складе');
}

cart.clearCart();
cart.addPositionToCart(newProduct1, 10);

// не успел(((

console.log('');