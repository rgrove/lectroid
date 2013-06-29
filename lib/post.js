var glob = require('glob'),
    path = require('path'),
    util = require('util'),

    _ = require('lodash'),

    Content = require('./content'),
    files, posts;

// -- Constructor --------------------------------------------------------------
function Post() {
    Content.apply(this, arguments);
}

util.inherits(Post, Content);

// -- Static Methods -----------------------------------------------------------
Post.getBySlug = function (slug) {
    return Content.getBySlug('post', slug);
};

Post.getByTag = function (tag) {
    return Content.tags['post'][tag];
};

Post.initialize = function () {
    Content.reset('post');

    files = [];
    posts = Content.items['post'];

    // Get an array of non-hidden post files in /content/post/.
    _.each(Content.TYPES, function (type, ext) {
        Array.prototype.push.apply(files, glob.sync('*' + ext, {
            cwd   : Post.prototype.root,
            nosort: true
        }));
    });

    // Create an array of Post instances.
    files.forEach(function (file) {
        // Skip hidden files.
        if (file.indexOf('.') === 0) {
            return;
        }

        posts.push(new Post(file));
    });

    // Sort posts in descending order by date.
    function sortPosts(a, b) {
        return b.date - a.date;
    }

    posts.sort(sortPosts);

    // Sort posts in the tag map in descending order by date.
    _.each(Content.tags['post'], function (posts) {
        posts.sort(sortPosts);
    });
};

Post.recent = function () {
    return Content.recent('post');
};

Post.render = Content.render;

// -- Prototype Properties -----------------------------------------------------
Post.prototype.klass = 'post';
Post.prototype.root  = path.join(Content.prototype.root, 'post');

// -- Server initialization ----------------------------------------------------
Post.initialize();

// -- Exports ------------------------------------------------------------------
module.exports = Post;
