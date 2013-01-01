#!/usr/bin/env node

/*
Usage: ./thoth-import <path to sqlite db>
*/

var fs = require('fs'),

    async      = require('async'),
    dateFormat = require('dateformat'),
    sqlite     = require('sqlite3'),
    yaml       = require('libyaml');

var CONTENT_DIR = __dirname + '/../../content';

var db = new sqlite.Database(process.argv[2], sqlite.OPEN_READONLY, begin);

function begin(err) {
    if (err) {
        throw err;
    }

    db.all('SELECT * FROM pages', importPages);
    db.all('SELECT * FROM posts', importPosts);
}

function importPages(err, rows) {
    if (err) {
        throw err;
    }

    rows.forEach(function (row) {
        var metadata = {
            title   : row.title,
            date    : new Date(Date.parse(row.created_at)),
            updated : new Date(Date.parse(row.updated_at)),
            imported: true,
            thoth_id: row.id
        };

        var filename = row.name.trim() + '.html';

        var content = yaml.stringify(metadata) + "---\n\n" + row.body_rendered;

        console.log('[page] ' + filename);

        fs.writeFileSync(CONTENT_DIR + '/page/' + filename, content, 'utf8');
    });
}

function importPosts(err, rows) {
    if (err) {
        throw err;
    }

    rows.forEach(function (row) {
        var metadata = {
            title   : row.title,
            date    : new Date(Date.parse(row.created_at)),
            updated : new Date(Date.parse(row.updated_at)),
            imported: true,
            tags    : [],
            thoth_id: row.id
        };

        var filename = dateFormat(row.created_at, 'yyyy-mm-dd') + '-' +
                row.name.trim() + '.html';

        if (row.draft === 't' || row.draft === true) {
            filename = '.' + filename;
        }

        db.all('SELECT * FROM tags_posts_map WHERE post_id = ?', row.id, function (err, tagMapRows) {
            if (err) {
                throw err;
            }

            if (!tagMapRows.length) {
                writePost();
                return;
            }

            tagMapRows.forEach(function (tagMap) {
                db.get('SELECT * FROM tags WHERE id = ?', tagMap.tag_id, function (err, tag) {
                    if (err) {
                        throw err;
                    }

                    metadata.tags.push(tag.name);

                    if (metadata.tags.length === tagMapRows.length) {
                        writePost();
                    }
                });
            });
        });

        function writePost() {
            metadata.tags.sort();

            var content = yaml.stringify(metadata) + "---\n\n" + row.body_rendered;

            console.log('[post] ' + filename);

            fs.writeFileSync(CONTENT_DIR + '/post/' + filename, content, 'utf8');
        }
    });
}
