function addTask(event) {
    // Define Task ID of new Task
    let taskId = 0;
    if (localStorage.getItem('tasks')) {
        let tasksFromLocalStorage = localStorage.getItem('tasks');
        let tasksFromLocalStorageArray = JSON.parse(tasksFromLocalStorage);
        taskId = tasksFromLocalStorageArray.length;
    }

    // Create new Task
    let newTask = {};
    newTask.id = String(taskId);
    newTask.title = event.target.title.value;
    newTask.description = event.target.description.value;
    newTask.prio = event.target.prio.value;
    newTask.done = "";
    newTask.createdDate = Date.now();
    newTask.dueDate = event.target.date.value ? event.target.date.value : undefined;
    newTask.completedDate = undefined;


    console.log("Add Task");
}


function removeTask() {
    if(tasks.length > 1) {
        tasks.splice(event.target.dataset.id, 1);
        console.log("Remove Task")
    } else {
        tasks.splice( -1, 1);
        console.log("Remove last Task")
    }
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

    addTask(event) {
        const newTask = new Task();
        tasks.push(newTask);

    }
}


console.log(new Task(5, "Cindy", "Test"));*/
