"use strict";

ready(function () {

    let changeStyle = document.querySelector("#js-change-style");
    let body = document.querySelector('body');

    changeStyle.addEventListener('click', (e) => {
        if (body.classList.contains("style-1")) {
            body.classList.remove('style-1');
            setItemInLocalStorage('style');
        } else {
            body.classList.add('style-1');
            setItemInLocalStorage('style', 'style1');
        }
    });

    if (getItemOutOfLoacalStroage('style')) {
        body.classList.add('style-1');
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

