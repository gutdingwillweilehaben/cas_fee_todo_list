Handlebars.registerHelper ("setChecked", function (value, currentValue) {
    if ( value == currentValue ) {
        return "checked";
    } else {
        return "";
    }
});

Handlebars.registerHelper("formatDate", function (datetime) {
    return moment(datetime).locale('de').calendar(null, {
        sameDay: '[Heute erledigt]',
        lastDay: '[Gestern erledigt]',
        lastWeek : '[Letzen] dddd',
        sameElse: '[Erledigt am:] DD.MM.YYYY'
    });
});


Handlebars.registerHelper("formatCalendar", function (datetime) {
    return moment(datetime).locale('de').endOf('day').fromNow();
});