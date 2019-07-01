import { taskService } from '../services/task-service.js'

const tasksContainer = document.querySelector("#tasksContainer");
const tasksRenderer = Handlebars.compile(document.querySelector("#task-template").innerHTML);

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

    document.querySelector('.add-task').classList.remove("show");
    document.getElementById('js-add-task-form').reset();

    await taskService.createTask(formDataString);
    renderTasks(sortBy, sortDirection, filtered);
});


tasksContainer.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (e.target.classList.contains('list-item__edit-form')) {

        const formData = new FormData(e.target);
        const data = Array.from(formData.entries()).reduce((memo, pair) => ({
            ...memo,
            [pair[0]]: pair[1],
        }), {});

        const formDataString = JSON.stringify(data);

        await taskService.updateTask(e.target.dataset.id, formDataString);
        renderTasks(sortBy, sortDirection, filtered);
    }
});


tasksContainer.addEventListener('click', async function (e) {
    if (e.target.classList.contains('btn--remove')) {

        await taskService.deleteTask(e.target.dataset.id);
        renderTasks(sortBy, sortDirection, filtered);

    } else if (e.target.classList.contains('list__task-title')) {

        let checked = false;

         if (e.target.previousElementSibling.checked === true) {
             checked = false;
         } else if (e.target.previousElementSibling.checked === false) {
             checked = true;
         }

         await taskService.toggleTask(e.target.dataset.id, checked);
         renderTasks(sortBy, sortDirection, filtered);


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


let sortBy = 'createdDate';
let sortDirection = 'asc';
let filtered = true;

const nav = document.querySelector('.nav');
nav.addEventListener('click', function (e) {

    if (e.target.classList.contains('nav__item-inbox')) {
        sortBy = 'createdDate';
        renderTasks(sortBy, sortDirection, filtered);

    } else if (e.target.classList.contains('nav__item-all-tasks')) {
        sortBy = 'dueDate';
        renderTasks(sortBy, sortDirection, filtered);

    } else if (e.target.classList.contains('nav__item-prio')) {
        sortBy = 'prio';
        let sortDirection = 'desc';
        renderTasks(sortBy, sortDirection, filtered);

    } else if (e.target.id === 'completedTasks') {
        filtered ? filtered = false : filtered = true;
        renderTasks(sortBy, sortDirection, filtered);
    }
});

function updateStatus() {
    renderTasks(sortBy, sortDirection, filtered);
}

updateStatus();