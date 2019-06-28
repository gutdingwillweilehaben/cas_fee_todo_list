import Datastore from 'nedb-promise'

export class Task {
    constructor(object) {

        this.id = 1;
        this.title = JSON.parse(object).title;
        this.state = "OK";
        this.description = JSON.parse(object).description;
        this.prio = JSON.parse(object).prio;
        this.done = "";
        this.createdDate = new Date();
        this.dueDate = new Date(JSON.parse(object).dueDate);
        this.completedDate = JSON.parse(object).completedDate;
    }
}

export class TaskStore {
    constructor(db) {
        this.db = db || new Datastore({filename: './data/tasks.db', autoload: true});
    }

    async add(object) {
        let task = new Task(object);
        return await this.db.insert(task);
    }

    async delete(id) {
        await this.db.update({_id: id}, {$set: {"state": "DELETED"}});
        return await this.get(id);
    }

    async put(id, object) {
        await this.db.update({_id: id},
            {$set:
                    {
                        "title": JSON.parse(object).title,
                        "description": JSON.parse(object).description,
                        "dueDate": new Date(JSON.parse(object).dueDate),
                        "prio": JSON.parse(object).prio,

                    }
            });
        return await this.get(id);
    }

    async get(id) {
        return await this.db.findOne({_id: id});
    }

    async all(currentUser) {
        return await this.db.cfind({}).sort({ orderDate: -1 }).exec();
    }
}

export const taskStore = new TaskStore();
