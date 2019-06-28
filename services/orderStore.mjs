import Datastore from 'nedb-promise'

export class Order {
    constructor(pizzaName) {
        this.pizzaName = pizzaName;
        this.orderDate = new Date();
        this.state = "OK";
    }
}

export class OrderStore {
    constructor(db) {
        this.db = db || new Datastore({filename: './data/orders.db', autoload: true});
    }

    async add(pizzaName) {
        let order = new Order(pizzaName);
        return await this.db.insert(order);
    }

    async delete(id) {
        await this.db.update({_id: id}, {$set: {"state": "DELETED"}});
        return await this.get(id);
    }

    async get(id) {
        return await this.db.findOne({_id: id});
    }

    async all(currentUser) {
        return await this.db.cfind({}).sort({ orderDate: -1 }).exec();
    }
}

export const orderStore = new OrderStore();