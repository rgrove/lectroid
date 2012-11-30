// Lectroid configuration.

module.exports = function (app) {

    // Name of this blog.
    app.set('siteName', 'Lectroid');

    // Absolute base URL for this site.
    app.set('siteUrl', 'http://localhost:5000/');

    // Name of this blog's author.
    app.set('author', 'Joe Blogger');

    // Email address for this blog's author.
    app.set('authorEmail', 'blogger@example.com');

    // Enable or disable gzip compression.
    app.enable('gzip');

    // Enable or disable legacy Thoth redirects.
    app.disable('legacyRedirects');

    // Production-only overrides.
    if (app.get('env') === 'production') {

        // Absolute base URL for this site.
        app.set('siteUrl', 'http://www.example.com/');

    }
};
