import {orderStore} from '../services/orderStore'

export class OrdersController {

    async getOrders(req, res) {
        res.json((await orderStore.all() || []))
    };

    async createPizza(req, res) {
        res.json(await orderStore.add(req.body.name));
    };

    async showOrder(req, res) {
        res.json(await orderStore.get(req.params.id));
    };

    async deleteOrder(req, res) {
        res.json(await orderStore.delete(req.params.id));
    };
}

export const ordersController = new OrdersController();