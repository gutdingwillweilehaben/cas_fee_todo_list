"use strict";

let tasks = [];


getDataFromLocalStorage();


ready(function () {

    let activeSortParameter = tasksSortedCreatedDate;

    // Handlebars
    const templateSource = document.getElementById("list-template").innerHTML;
    const template = Handlebars.compile(templateSource);
    let taskList = document.querySelector(".list");



    function init(sortParameter) {
        taskList.innerHTML = template(sortParameter);

        // Add Event Listener
        const forms = document.querySelectorAll('.list-item__edit-form');
        forms.forEach((form) => {
            form.addEventListener("submit", function (event) {
                event.preventDefault();
                updateTask(event);
                document.querySelector('body').classList.remove('edit');
            });
        });

        const removeButtons = document.querySelectorAll('.btn--remove');
        removeButtons.forEach((button) => {
            button.addEventListener("click", function (event) {

                removeTask();
                updateLocalStorage(tasks);
                init(activeSortParameter);

            })
        });

        const taskCheckDone = document.querySelectorAll('.list__task-done');
        taskCheckDone.forEach( (taskCheck ) => {
            taskCheck.addEventListener("click", function (event) {

                // Search for ID
                function CallbackFunctionToFindTaskById(task) {
                    if (parseInt(task.id) === parseInt(event.target.dataset.id)) {
                        console.log("Found ID");
                        return parseInt(task.id) === parseInt(event.target.dataset.id);
                    } else {
                        console.log("Looking for ID")
                    }
                }

                let task = tasks.find(CallbackFunctionToFindTaskById);

                if (task.done === "checked") {
                    task.done = "";
                } else {
                    task.done = "checked";
                }

                updateLocalStorage(tasks);
                init(activeSortParameter);
            })
        });

        const editButtons = document.querySelectorAll('.btn--edit');
        editButtons.forEach((button) => {
            button.addEventListener("click", function (event) {
                console.log("Edit");

                event.target.parentNode.nextElementSibling.classList.toggle("show");
                document.querySelector('body').classList.add('edit');
            })
        });

        const newTaskButton = document.querySelector('#js-add-task');
        newTaskButton.addEventListener("click", function (event) {
            event.target.parentNode.nextElementSibling.classList.add("show");
        })
    }

    init(activeSortParameter);



    // Sort
    const navInbox = document.querySelector('.nav__item-inbox');
    const navAllTasks = document.querySelector('.nav__item-all-tasks');
    const navPrio = document.querySelector('.nav__item-prio');

    navInbox.addEventListener("click", function(){
        activeSortParameter = tasksSortedCreatedDate;
        init(activeSortParameter);
    });

    navAllTasks.addEventListener("click", function(){
        activeSortParameter = tasksSortedDueDate;
        init(activeSortParameter);
    });

    navPrio.addEventListener("click", function(){
        activeSortParameter = tasksSortedPrio;
        init(activeSortParameter);
    });


    function updateTask(event) {

        // Search for ID
        function CallbackFunctionToFindTaskById(task) {


            if (parseInt(task.id) === parseInt(event.target.dataset.id)) {
                console.log("Found ID");
                return parseInt(task.id) === parseInt(event.target.dataset.id);
            } else {
                console.log("Looking for ID")
            }
        }

        let task = tasks.find(CallbackFunctionToFindTaskById);

        task.title = event.target.title.value;
        task.description = event.target.description.value;
        task.dueDate = event.target.date.value;

        if (event.target.prio1.checked === true) {
            task.prio = 1;
        } else if (event.target.prio2.checked === true) {
            task.prio = 2;
        } else if (event.target.prio3.checked === true) {
            task.prio = 3;
        } else if (event.target.prio4.checked === true) {
            task.prio = 4;
        } else if (event.target.prio5.checked === true) {
            task.prio = 5;
        } else {
            task.prio = undefined;
        }

        updateLocalStorage(tasks);

        init(activeSortParameter);
    }


    // Add
    const addTaskForm = document.querySelector('#js-add-task-form');

    addTaskForm.addEventListener("submit", function (event) {
        event.preventDefault();

        addTask(event);

        event.target.parentNode.classList.toggle("show");
        document.querySelector('body').classList.remove('edit');
        document.querySelector('#js-add-task').classList.remove("show");

        updateLocalStorage(tasks);
        init(activeSortParameter);

        addTaskForm.reset();
    });


    let changeStyle = document.querySelector("#js-change-style");

    changeStyle.addEventListener('click', (event) => {
       document.querySelector('body').classList.toggle('style-1');
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