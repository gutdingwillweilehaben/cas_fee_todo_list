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