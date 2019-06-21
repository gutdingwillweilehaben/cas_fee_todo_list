"use strict";

let tasks = [];

getDataFromLocalStorage();

ready(function () {

    let activeSortParameter = tasksSortedCreatedDate;

    // Handlebars
    const templateSource = document.getElementById("list-template").innerHTML;
    const template = Handlebars.compile(templateSource);
    let taskList = document.querySelector(".list");


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

        addTask(e);

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
            activeSortParameter = tasksSortedCreatedDate;
            init(activeSortParameter);
        } else if (e.target.classList.contains('nav__item-all-tasks')) {
            activeSortParameter = tasksSortedDueDate;
            init(activeSortParameter);
        } else if (e.target.classList.contains('nav__item-prio')) {
            activeSortParameter = tasksSortedPrio;
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


function ready(cb) {
    // ready
    if (document.readyState === "complete" || document.readyState !== "loading" && !document.documentElement.doScroll) {
        cb();
    } else {
        document.addEventListener("DOMContentLoaded", cb);
    }
}

function setCookie(name, value, days) {
    var d = new Date;
    d.setTime(d.getTime() + 24*60*60*1000*days);
    document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
}

function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

function deleteCookie(name) {
    setCookie(name, '', -1);
}

