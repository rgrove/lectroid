#!/usr/bin/env node

// -- Lectroid modules ---------------------------------------------------------
var Page      = require('./lib/page'),
    Paginator = require('./lib/paginator'),
    Post      = require('./lib/post');

// -- Express initialization ---------------------------------------------------
var express = require('express'),
    app     = express();

app.engine('handlebars', require('./lib/handlebars-engine'));

app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

// Load config.
require('./config')(app);

// Load view helpers.
require('./lib/helpers')(app);

if (app.enabled('gzip')) {
    app.use(express.compress());
}

if (app.get('env') === 'development') {
    app.use(express.responseTime());
    app.use(express.logger('tiny'));
}

app.use(express.static(__dirname + '/public'));
app.use(app.router);

// -- Routes -------------------------------------------------------------------
app.get('/', function (req, res) {
    if (req.query.page === '1') {
        res.redirect(301, '/');
        return;
    }

    var posts = Post.recent(),

        paginator = new Paginator(posts, '/?page=:page', {
            labelNext: 'Older &raquo;',
            labelPrev: '&laquo; Newer',
            page     : req.query.page || 1
        });

    posts = paginator.itemsOnPage();

    Post.render(posts, function (err) {
        if (err) {
            next(err);
            return;
        }

        res.render('index', {
            pagination: paginator,
            posts     : posts,
            title     : app.get('siteName')
        });
    });
});

app.get('/page/:slug', function (req, res, next) {
    var page = Page.getBySlug(req.params.slug);

    if (!page) {
        next();
        return;
    }

    Page.render(page, function (err) {
        if (err) {
            next(err);
            return;
        }

        res.render('page', {
            page : page,
            title: page.title
        });
    })
});

app.get('/post/:slug', function (req, res, next) {
    var post = Post.getBySlug(req.params.slug);

    if (!post) {
        next();
        return;
    }

    Post.render(post, function (err) {
        if (err) {
            next(err);
            return;
        }

        res.render('post', {
            post : post,
            title: post.title + ' - ' + app.get('siteName')
        });
    })
});

app.get('/robots.txt', function (req, res) {
    res.type('text/plain');

    res.render('robots', {
        layout: false
    });
});

app.get('/rss', function (req, res, next) {
    var posts = Post.recent().slice(0, 10);

    Post.render(posts, function (err) {
        if (err) {
            next(err);
            return;
        }

        res.render('rss', {
            layout: false,
            posts : posts,
        });
    });
});

app.get('/sitemap', function (req, res) {
    res.type('text/xml');

    res.render('sitemap', {
        layout: false,
        pages : Page.recent(),
        posts : Post.recent()
    });
});

app.get('/tag/:tag', function (req, res, next) {
    var tag   = req.params.tag,
        posts = Post.getByTag(tag);

    if (!posts) {
        next();
        return;
    }

    var paginator = new Paginator(posts, '/tag/' + encodeURIComponent(tag) + '?page=:page', {
            labelNext: 'Older &raquo;',
            labelPrev: '&laquo; Newer',
            page     : req.query.page || 1
        });

    posts = paginator.itemsOnPage();

    Post.render(posts, function (err) {
        if (err) {
            next(err);
            return;
        }

        // Tell robots not to index this page, since it contains duplicate
        // content. They'll still follow links on it, though.
        res.set('X-Robots-Tag', 'noindex');

        res.render('tag', {
            pagination: paginator,
            posts     : posts,
            tag       : tag,
            title     : 'Posts tagged with "' + tag + '" - ' + app.get('siteName')
        });
    })
});

// -- Legacy redirects ---------------------------------------------------------

if (app.enabled('legacyRedirects')) {
    app.get('/archive', function (req, res) {
        res.redirect(301, '/');
    });

    app.get('/archive/:page', function (req, res) {
        res.redirect(301, '/?page=' + encodeURIComponent(req.params.page));
    });

    app.get('/tag/:tag/:page', function (req, res) {
        res.redirect(301, '/tag/' + encodeURIComponent(req.params.tag) +
                '?page=' + encodeURIComponent(req.params.page));
    });
}

// -- Error handlers -----------------------------------------------------------

app.use(function (req, res, next) {
    res.status(404);

    res.set('X-Robots-Tag', 'noindex');

    if (req.accepts('html')) {
        res.render('error/404', {
            url: req.url
        });

        return;
    }

    if (req.accepts('json')) {
        res.send({error: 'Not found.'});
        return;
    }

    res.type('txt').send('Not found.');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);

    res.status(err.status || 500);
    res.render('error/500', {error: err});
});

// -- Server -------------------------------------------------------------------
var port = process.env.PORT || 5000;

app.listen(port, function () {
    console.log('Listening on port ' + port);
});
