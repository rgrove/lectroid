module.exports = function (app) {
    var dateFormat = require('dateformat'),
        Handlebars = require('handlebars'),

        siteUrl = app.get('siteUrl').replace(/\/$/, '');

    app.locals.year = new Date().getFullYear();

    Handlebars.registerHelper('formatDate', function (date) {
        return dateFormat(date, 'yyyy-mm-dd');
    });

    Handlebars.registerHelper('getUrl', function (relativeUrl) {
        return siteUrl + '/' + relativeUrl.replace(/^\//, '');
    });

    Handlebars.registerHelper('getTagUrl', function (tag) {
        return siteUrl + '/tag/' + encodeURIComponent(tag);
    });

    Handlebars.registerHelper('rfc822Date', function (date) {
        return dateFormat(date, 'dd mmm yyyy HH:MM:ss o');
    });

    Handlebars.registerHelper('w3cDate', function (date) {
        return dateFormat(date, 'isoUtcDateTime');
    });
};
