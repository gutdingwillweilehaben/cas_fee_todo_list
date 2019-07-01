function ready(cb) {
    // ready
    if (document.readyState === "complete" || document.readyState !== "loading" && !document.documentElement.doScroll) {
        cb();
    } else {
        document.addEventListener("DOMContentLoaded", cb);
    }
}

function setItemInLocalStorage(name, value) {
    if (value) {
        localStorage.setItem(name, JSON.stringify(value));
    }
    else {
        localStorage.removeItem(name);
    }
}

function getItemOutOfLoacalStroage(name) {
    return JSON.parse(localStorage.getItem(name) || null);
}