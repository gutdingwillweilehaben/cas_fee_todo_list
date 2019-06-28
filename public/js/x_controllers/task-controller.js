import { Task } from '../x_model/task.js'

"use strict";

ready(function () {

    let activeSortParameter = Task.tasksSortedCreatedDate;


    let tasks = getDataFromLocalStorage();
    const ordersContainer = document.querySelector(".list");
    const ordersRenderer = Handlebars.compile(document.querySelector("#list-template").innerHTML);
    ordersContainer.innerHTML = ordersRenderer({tasks: tasks});


    // TODO: Original COde index-controller 31

    // Handlebars


    let changeStyle = document.querySelector("#js-change-style");
    let body = document.querySelector('body');

    changeStyle.addEventListener('click', (e) => {
        if (body.classList.contains("style-1")) {
            body.classList.remove('style-1');
            deleteCookie('style');
        } else {
            body.classList.add('style-1');
            setCookie('style', 'style1', 10);
        }
    });

    if (getCookie('style')) {
        body.classList.add('style-1');
    }

    if (getCookie('hideDone')) {
        document.getElementById('completedTasks').checked = false;
    }

    const newTaskButton = document.querySelector('#js-add-task');
    newTaskButton.addEventListener("click", function (e) {
        e.target.parentNode.nextElementSibling.classList.add("show");


        let openLightboxAdd = document.querySelector('.add-task.show');

        if (openLightboxAdd) {
            openLightboxAdd.addEventListener('click', function (e) {

                if (e.target.type === "reset") {
                    openLightboxAdd.classList.remove('show');
                }

                if (e.target.classList.contains('show')) {
                    e.target.childNodes[1].reset();
                    e.target.classList.remove('show');
                }
            });
        }

    });


    // Event-Bubbling
    taskList.addEventListener('click', function (e) {

        if (e.target.classList.contains('btn--remove')) {
            removeTaskbyId(e.target.dataset.id);
            updateLocalStorage(tasks);
            init(activeSortParameter);

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

    taskList.addEventListener('submit', function (e) {
        e.preventDefault();
        if (e.target.classList.contains('list-item__edit-form')) {
            updateTask(e);
            updateLocalStorage(tasks);
            init(activeSortParameter);
        }
    });

    function init(sortParameter) {

        taskList.innerHTML = template(sortParameter);

        if (getCookie('hideDone')) {
            let allTasks = document.querySelectorAll('.list__task');
            allTasks.forEach(function (task) {
                if (task.dataset.state === "checked") {
                    task.classList.add('hide');
                }
            });
        }
    }

    init(activeSortParameter);



    // Add
    const addTaskForm = document.querySelector('#js-add-task-form');

    addTaskForm.addEventListener("submit", function (e) {
        e.preventDefault();

        //addTask(e);

        Task.addTask(e);

        e.target.parentNode.classList.toggle("show");
        document.querySelector('#js-add-task').classList.remove("show");

        updateLocalStorage(tasks);
        init(activeSortParameter);

        addTaskForm.reset();
    });


    // Sort
    const nav = document.querySelector('.nav');
    nav.addEventListener('click', function (e) {

        if (e.target.classList.contains('nav__item-inbox')) {
            activeSortParameter = Task.tasksSortedCreatedDate;
            init(activeSortParameter);
        } else if (e.target.classList.contains('nav__item-all-tasks')) {
            activeSortParameter = Task.tasksSortedDueDate;
            init(activeSortParameter);
        } else if (e.target.classList.contains('nav__item-prio')) {
            activeSortParameter = Task.tasksSortedPrio;
            init(activeSortParameter);
        } else if (e.target.id === 'completedTasks') {
            if (getCookie('hideDone')) {
                deleteCookie('hideDone');
            } else {
                setCookie('hideDone', 'true', 356);
            }
            init(activeSortParameter);
        }
    });

});

