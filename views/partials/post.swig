<article id="post-{{slug}}" class="post content{% if imported %} imported{% endif %}">
    <header class="hd">
        <h1 class="title">
            <a href="{{url}}" rel="bookmark">{{title}}</a>
        </h1>

        <time class="date" datetime="{{date}}" pubdate>
            <a href="{{url}}" rel="bookmark">{{date|date("Y-m-d")}}</a>
        </time>
    </header>

    <div class="bd">
        {{html|raw}}
    </div>

    <footer class="ft meta">
        {% if tags.length %}
            <ul class="tags">
                {% for tag in tags %}
                    <li class="tag"><a href="{{tag|tagUrl}}" rel="tag">{{tag}}</a></li>
                {% endfor %}
            </ul>
        {% endif %}
    </footer>
</article>
