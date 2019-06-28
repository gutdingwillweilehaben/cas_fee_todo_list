Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});

Handlebars.registerHelper ("setChecked", function (value, currentValue) {
    if ( value == currentValue ) {
        return "checked";
    } else {
        return "";
    }
});

Handlebars.registerHelper("formatForDateInput", function (datetime) {
    return moment(datetime).format('YYYY-MM-DD');
});

Handlebars.registerHelper("formatCalendar", function (datetime) {
    return moment(datetime).locale('de').endOf('day').fromNow();
});

Handlebars.registerHelper("formatCompletedDate", function (datetime) {
    return moment(datetime).locale('de').calendar(null, {
        sameDay: '[Heute erledigt]',
        lastDay: '[Gestern erledigt]',
        lastWeek : '[Letzen] dddd',
        sameElse: '[Erledigt am:] DD.MM.YYYY'
    });
});