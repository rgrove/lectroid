---
title: Welcome to Lectroid
tags:
- welcome
- first post
- awesome
---

Hello! I'm Lectroid. I'm a really boring blog engine that doesn't come with any CSS by default, so you have to do a bunch of work just to make me look decent.

Posts and Pages
---------------

Blog posts and pages in Lectroid live in git on the filesystem. Open up your Lectroid directory and find the `content/` directory. Inside it are a `page/` subdirectory and a `post/` subdirectory. This is where pages and posts live.

A page or a post is just a text file with a `.md` (for Markdown) or `.html` (for HTML) extension. The filename will become the URL, and posts may optionally include a date prefix in their filename which will be used as the creation date of the post (but will not be used in the URL).

For example, this post is actually a file named `2012-11-29-welcome-to-lectroid.md`. Open it up and take a look at the source!

At the top of the file, you'll see a section that looks like this:

    ---
    title: Welcome to Lectroid
    tags:
    - welcome
    - first post
    - awesome
    ---

That's [YAML](http://yaml.org/) "front matter", or metadata about the post such as its title, tags, etc. YAML is a simple markup language. You can put any metadata you want here, but there's some basic metadata that Lectroid cares about.

All of these fields are optional except the `title` field.

  * **date** - The creation date (and optionally time) of the post. Use a sensible format like `2012-11-29`. If you don't include this field, Lectroid will look for a date in the post's filename, and if it still doesn't find a date there, it'll use the file's creation time as its date.

  * **slug** - If specified, this slug will be used in the URL of the post instead of the post's filename.

  * **tags** - A list of one or more tags that apply to the post. Specifying tags will allow Lectroid to categorize your post and make it easier for people to find it.

  * **title** - The title of the post, which will be rendered in a heading above the content of the post.

  * **updated** - The date (and optionally time) when the post was last updated. If this field is not provided, Lectroid will use the creation date. This value isn't displayed to users in Lectroid's default templates, but is used in the sitemap that's shared with search robots.

After the YAML front matter is the body of the post, which in this case is written in the [Markdown](http://daringfireball.net/projects/markdown/) format, since the post has a `.md` file extension. If you give a post a `.html` extension, then Lectroid will treat the body as raw HTML.

Pages work more or less the same way, but live in the `content/pages/` directory, and are treated as standalone pages on the site rather than as blog posts.

Styling Lectroid
----------------

Lectroid doesn't come with any default CSS because I don't want your blog to look exactly like mine, and I'm way too lazy to design a theme for you. So if you want Lectroid to look pretty, you'll need to style it yourself.

Edit `public/css/core.css` to your heart's content.

Customizing Lectroid
--------------------

Since Lectroid is distributed via a git project rather than via downloadable archives or an installable app, the best way to customize it is to simple clone or fork the main Lectroid repo, then create a branch where your changes will live.

This way you can customize Lectroid to your heart's content while still merging in upstream changes when you want to. You may need to resolve conflicts every now and then, but that's not too hard.

Hosting Lectroid
----------------

Lectroid is designed to be easily hosted on [Heroku](http://www.heroku.com/) or any other hosting provider that supports Node.js. Getting Lectroid up and running on Heroku is as simple as creating a new Heroku app and then pushing your Lectroid repo to it. For other hosting providers, you're on your own, but it shouldn't be much harder in most cases.
