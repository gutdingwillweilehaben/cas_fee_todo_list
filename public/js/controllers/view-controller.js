"use strict";

ready(function () {

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

});

