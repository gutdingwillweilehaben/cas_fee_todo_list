import { taskService } from '../services/task-service.js'

const tasksContainer = document.querySelector("#tasksContainer");

const tasksRenderer = Handlebars.compile(document.querySelector("#task-template").innerHTML);

let sortBy = 'createdDate';
let sortDirection = 'asc';
let filtered = false;


async function renderTasks(sortBy, sortDirection, filtered) {
    tasksContainer.innerHTML = tasksRenderer({tasks: await taskService.getTasks(sortBy, sortDirection, filtered)});
}

document.getElementById('js-add-task-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Array.from(formData.entries()).reduce((memo, pair) => ({
        ...memo,
        [pair[0]]: pair[1],
    }), {});

    const formDataString = JSON.stringify(data);

    //alert(formDataString);
    //console.dir(JSON.parse(formDataString));

    document.querySelector('.add-task').classList.remove("show");
    document.getElementById('js-add-task-form').reset();

    await taskService.createTask(formDataString);
    renderTasks();
});

tasksContainer.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (e.target.classList.contains('list-item__edit-form')) {
        console.log('TEST');

        const formData = new FormData(e.target);
        const data = Array.from(formData.entries()).reduce((memo, pair) => ({
            ...memo,
            [pair[0]]: pair[1],
        }), {});

        const formDataString = JSON.stringify(data);

        //alert(formDataString);
        //console.dir(JSON.parse(formDataString));

        await taskService.updateTask(e.target.dataset.id, formDataString);
        renderTasks();
    }
});




// Event-Bubbling
tasksContainer.addEventListener('click', async function (e) {

    if (e.target.classList.contains('btn--remove')) {

        await taskService.deleteTask(e.target.dataset.id);
        await renderTasks();

    } else if (e.target.classList.contains('list__task-title')) {

        checkTaskById(e.target.parentNode.dataset.id);
        updateLocalStorage(tasks);
        init(activeSortParameter);


    } else if (e.target.classList.contains('btn--edit')) {
        e.target.parentNode.nextElementSibling.classList.add("show");

        let openLightbox = document.querySelector('.list__task-edit.show');

        if (openLightbox) {
            openLightbox.addEventListener('click', function (e) {

                if (e.target.type === "reset") {
                    openLightbox.classList.remove('show');
                }

                if (e.target.classList.contains('show')) {
                    e.target.childNodes[1].reset();
                    e.target.classList.remove('show');
                }
            });
        }
    }
});



// Sort
const nav = document.querySelector('.nav');
nav.addEventListener('click', function (e) {

/*    let sortBy = '';
    let sortDirection = 'asc';
    let filtered = false;*/


    if (e.target.classList.contains('nav__item-inbox')) {
        alert('Sort Inbox');
        sortBy = 'createdDate';
        renderTasks(sortBy, sortDirection, filtered);

    } else if (e.target.classList.contains('nav__item-all-tasks')) {
        alert('Sort DueDate');
        sortBy = 'dueDate';
        renderTasks(sortBy, sortDirection, filtered);

    } else if (e.target.classList.contains('nav__item-prio')) {
        alert('Sort Prio');
        sortBy = 'prio';
        renderTasks(sortBy, sortDirection, filtered);


    } else if (e.target.id === 'completedTasks') {
        alert('Filtern');

        if (filtered === true) {
            filtered = false;
        } else {
            filtered = true;
        }
        renderTasks(sortBy, sortDirection, filtered);

    }
});



function updateStatus() {
    renderTasks(sortBy, sortDirection, filtered);
}


updateStatus();