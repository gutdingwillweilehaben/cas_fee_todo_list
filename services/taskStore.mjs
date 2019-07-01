import Datastore from 'nedb-promise'

export class Task {
    constructor(object) {

        this.title = JSON.parse(object).title;
        this.description = JSON.parse(object).description;
        this.prio = JSON.parse(object).prio;
        this.done = false;
        this.createdDate = new Date();
        this.dueDate = new Date(JSON.parse(object).dueDate);
        this.completedDate = null;
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
        await this.db.remove({_id: id});
        return await this.get(id);
    }

    async check(id, checked) {
        await this.db.update({_id: id},
            {$set:
                    {
                        "done": JSON.parse(checked),
                        "completedDate": new Date(),
                    }
            });
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

    async all(sortBy = 'prio', sortDirection = 'asc', filtered = false ) {

        let filterObject = {};

        let sortObject = {};

        if(sortDirection === 'asc') {
            sortObject[sortBy] =  1;
        } else if (sortDirection === 'desc') {
            sortObject[sortBy] =  -1;
        };

        if (filtered === 'true') {
            filterObject["done"] = false
        };

        return await this.db
            .cfind(filterObject)
            .sort(sortObject)
            .exec();
    }

}

export const taskStore = new TaskStore();
