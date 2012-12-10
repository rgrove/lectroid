<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>{{settings.siteUrl}}</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>

    {% for page in pages %}
        <url>
            <loc>{{page.url|absoluteUrl}}</loc>
            <lastmod>{{page.updated|date("c")}}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.6</priority>
        </url>
    {% endfor %}

    {% for post in posts %}
        <url>
            <loc>{{post.url|absoluteUrl}}</loc>
            <lastmod>{{post.updated|date("c")}}</lastmod>
            <changefreq>weekly</changefreq>
        </url>
    {% endfor %}
</urlset>
