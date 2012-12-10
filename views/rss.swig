<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>{{settings.siteName}}</title>
        <link>{{settings.siteUrl}}</link>
        <managingEditor>{{settings.authorEmail}} ({{settings.author}})</managingEditor>
        <webMaster>{{settings.authorEmail}} ({{settings.author}})</webMaster>
        <docs>http://backend.userland.com/rss</docs>
        <ttl>60</ttl>
        <atom:link rel="self" type="application/rss+xml" href="{% filter absoluteUrl %}/rss{% endfilter %}"/>

        {% for post in posts %}
            <item>
                <title>{{post.title}}</title>
                <link>{{post.url|absoluteUrl}}</link>
                <guid isPermaLink="true">{{post.url|absoluteUrl}}</guid>
                <pubDate>{{post.date|date("r")}}</pubDate>
                <description>
                    {{post.html}}
                </description>

                {% for tag in post.tags %}
                    <category domain="{{tag|tagUrl}}">{{tag}}</category>
                {% endfor %}
            </item>
        {% endfor %}
    </channel>
</rss>
