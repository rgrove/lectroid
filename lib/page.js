var glob = require('glob'),
    path = require('path'),
    util = require('util'),

    _ = require('underscore'),

    Content = require('./content');

// -- Constructor --------------------------------------------------------------
function Page() {
    Content.apply(this, arguments);
}

util.inherits(Page, Content);

// -- Static Methods -----------------------------------------------------------

Page.getBySlug = function (slug) {
    return Content.getBySlug('page', slug);
};

Page.recent = function () {
    return Content.recent('page');
};

Page.render = Content.render;

// -- Prototype Properties -----------------------------------------------------
Page.prototype.klass = 'page';
Page.prototype.root  = path.join(Content.prototype.root, 'page');

// -- Server initialization ----------------------------------------------------

// Get an array of non-hidden files in /content/page/.
var files = [];

_.each(Content.TYPES, function (type, ext) {
    Array.prototype.push.apply(files, glob.sync('*' + ext, {
        cwd   : Page.prototype.root,
        nosort: true
    }));
});

// Create an array of Page instances.
var pages = (Content.items['page'] = []);

files.forEach(function (file) {
    // Skip hidden files.
    if (file.indexOf('.') === 0) {
        return;
    }

    pages.push(new Page(file));
});

// Sort posts in descending order by date.
pages.sort(function (a, b) {
    return b.date - a.date;
});

// -- Exports ------------------------------------------------------------------
module.exports = Page;
