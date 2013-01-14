{% extends "layouts/default.swig" %}

{% block pageBody %}
    {% if pagination %}
        {% if pagination.page > 1 %}
            <h1 class="special">Older posts</h1>

            {% include "partials/pagination-stats.swig" %}
            {% include "partials/pagination.swig" %}
        {% endif %}
    {% endif %}

    <section class="posts hfeed">
        {% include "partials/author.swig" %}

        {% for post in posts %}
            {% include "partials/post.swig" with post %}
        {% endfor %}
    </section>

    {% include "partials/pagination.swig" %}
{% endblock %}
