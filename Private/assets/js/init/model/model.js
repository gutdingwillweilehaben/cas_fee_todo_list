function addTask(e) {
    // Define Task ID of new Task
    let taskId = 0;

    if (localStorage.getItem('tasks')) {
        let tasksFromLocalStorage = localStorage.getItem('tasks');
        let tasksFromLocalStorageArray = JSON.parse(tasksFromLocalStorage);
        let lastTask = tasksFromLocalStorageArray[tasksFromLocalStorageArray.length - 1];
        taskId = parseInt(lastTask.id) + 1;
    }

    let newTask = {};
    newTask.id = String(taskId);
    newTask.title = e.target.title.value;
    newTask.description = e.target.description.value;
    newTask.prio = e.target.prio.value;
    newTask.done = "";
    newTask.createdDate = Date.now();
    newTask.dueDate = e.target.date.value ? e.target.date.value : undefined;
    newTask.completedDate = "";
    tasks.push(newTask);
}


function removeTaskbyId(id) {
    let indexInTasks = tasks.findIndex(x => x.id === id);
    tasks.splice(indexInTasks, 1);
}

function compareTasksPrio(s1, s2) {
    return s2.prio - s1.prio;
}

function tasksSortedPrio(){
    return [...tasks].sort(compareTasksPrio);
}

function compareTasksDueDate(s1, s2) {
    if (s2.dueDate === "") return -1;
    return new Date(s1.dueDate) - new Date(s2.dueDate);
}

function tasksSortedDueDate(){
    return [...tasks].sort(compareTasksDueDate);
}

function compareTasksCreatedDate(s1, s2) {
    return s1.createdDate - s2.createdDate;
}

function tasksSortedCreatedDate(){
    return [...tasks].sort(compareTasksCreatedDate);
}

function checkTaskById(id) {
    tasks.forEach(function (task) {
        if (task.id === id) {
            task.done = task.done === "checked" ? "" : "checked";
            task.completedDate = Date.now();
        }
    })
}


function getTaskbyId(id) {
    return tasks.find(x => x.id === id);
}

function updateTask(e) {

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


/*
class Task {
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

    addTask(e) {
        const newTask = new Task();
        tasks.push(newTask);

    }
}


console.log(new Task(5, "Cindy", "Test"));
*/
