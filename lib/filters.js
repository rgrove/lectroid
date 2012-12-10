module.exports = function (app) {
    var siteUrl = app.get('siteUrl').replace(/\/$/, '');

    return {
        absoluteUrl: function (relativeUrl) {
            return siteUrl + '/' + relativeUrl.replace(/^\//, '');
        },

        tagUrl: function (tag) {
            return siteUrl + '/tag/' + encodeURIComponent(tag);
        }
    };
};
