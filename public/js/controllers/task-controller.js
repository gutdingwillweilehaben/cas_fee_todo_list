import { taskService } from '../services/task-service.js'

const tasksContainer = document.querySelector("#tasksContainer");

const tasksRenderer = Handlebars.compile(document.querySelector("#task-template").innerHTML);


async function renderTasks() {
    tasksContainer.innerHTML = tasksRenderer({tasks: await taskService.getTasks()});
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

    if (e.target.classList.contains('nav__item-inbox')) {
        //activeSortParameter = Task.tasksSortedCreatedDate;
        //init(activeSortParameter);
    } else if (e.target.classList.contains('nav__item-all-tasks')) {
        //activeSortParameter = Task.tasksSortedDueDate;
        //init(activeSortParameter);
    } else if (e.target.classList.contains('nav__item-prio')) {
        //activeSortParameter = Task.tasksSortedPrio;
        //init(activeSortParameter);
    } else if (e.target.id === 'completedTasks') {
        if (getCookie('hideDone')) {
            deleteCookie('hideDone');
        } else {
            setCookie('hideDone', 'true', 356);
        }
        //init(activeSortParameter);
    }
});



function updateStatus() {
    renderTasks();
}


updateStatus();