import {taskStore} from '../services/taskStore'

export class TasksController {

    async getTasks(req, res) {
        console.log('req.query.sort', req.query.sort);

        res.json((await taskStore.all(req.query.sort, req.query.sortDirection, req.query.filtered, )));
    };

    async createTask(req, res) {
        res.json(await taskStore.add(req.body.name));
    };

    async getTask(req, res) {
        res.json(await taskStore.get(req.params.id));
    };

    async updateTask(req, res) {
        res.json(await taskStore.put(req.params.id, req.body.name));
    };

    async deleteTask(req, res) {
        res.json(await taskStore.delete(req.params.id));
    };
}

export const tasksController = new TasksController();