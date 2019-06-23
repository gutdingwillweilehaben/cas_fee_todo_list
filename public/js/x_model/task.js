export class Task {
    constructor(id, title, description, prio, done, dueDate, completedDate) {
        this.id = id;
        this.title = title || 'unknown';
        this.description = description || '';
        this.prio = prio || 0;
        this.done = "";
        this.createdDate = Date.now();
        this.dueDate = dueDate;
        this.completedDate = completedDate || undefined;
    }
    static addTask(e) {

        // Define Task ID of new Task
        let taskId = 0;

        if (localStorage.getItem('tasks')) {
            let tasksFromLocalStorage = localStorage.getItem('tasks');
            let tasksFromLocalStorageArray = JSON.parse(tasksFromLocalStorage);
            let lastTask = tasksFromLocalStorageArray[tasksFromLocalStorageArray.length - 1];
            taskId = parseInt(lastTask.id) + 1;
        }

        const newTask = new Task(taskId, e.target.title.value, e.target.description.value,
            e.target.prio.value, "", Date.now(), e.target.date.value ? e.target.date.value : undefined, "" );
        tasks.push(newTask);
    }

    static removeTaskbyId(id) {
        let indexInTasks = tasks.findIndex(x => x.id === id);
        tasks.splice(indexInTasks, 1);
    }

    static compareTasksPrio(s1, s2) {
        return s2.prio - s1.prio;
    }

    tasksSortedPrio(){
        return [...tasks].sort(compareTasksPrio);
    }

    static compareTasksDueDate(s1, s2) {
        if (s2.dueDate === "") return -1;
        return new Date(s1.dueDate) - new Date(s2.dueDate);
    }

    tasksSortedDueDate(){
        return [...tasks].sort(compareTasksDueDate);
    }

    static compareTasksCreatedDate(s1, s2) {
        return s1.createdDate - s2.createdDate;
    }

    tasksSortedCreatedDate(){
        return [...tasks].sort(compareTasksCreatedDate);
    }

    static checkTaskById(id) {
        tasks.forEach(function (task) {
            if (task.id === id) {
                task.done = task.done === "checked" ? "" : "checked";
                task.completedDate = Date.now();
            }
        })
    }


    static getTaskbyId(id) {
        return tasks.find(x => x.id === id);
    }

    static updateTask(e) {

        let task = getTaskbyId(e.target.dataset.id);

        task.title = e.target.title.value;
        task.description = e.target.description.value;
        task.dueDate = e.target.date.value;

        let prios = [
            { prio: e.target.prio1 },
            { prio: e.target.prio2 },
            { prio: e.target.prio3 },
            { prio: e.target.prio4 },
            { prio: e.target.prio5 }
        ];

        for (let prio of prios) {
            if (prio.prio.checked === true) {
                task.prio = prio.prio.value;
            }
        }
    }

}



