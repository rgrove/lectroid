/*jshint node: true */

"use strict";

var moment = require('moment');

module.exports = function (grunt) {

// -- Config -------------------------------------------------------------------
grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
});

// -- Tasks --------------------------------------------------------------------
grunt.registerTask('post', 'Creates a new blog post.', function (slug) {
    var date     = moment(),
        filename = __dirname + '/content/post/' + date.format('YYYY-MM-DD');

    if (slug) {
        filename += '-' + slug;
    }

    filename += '.md';

    grunt.file.write(filename,
        '---\n' +
        'title: \n' +
        'date: ' + date.toISOString() + '\n' +
        'tags:\n' +
        '- \n' +
        '---\n\n'
    );

    grunt.log.ok(filename);
    require('child_process').exec(process.env.EDITOR + " '" + filename + "'");
});

};
