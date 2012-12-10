{% extends "layouts/default.swig" %}

{% block title %}
    Posts tagged with &ldquo;{{tag}}&rdquo; - {{settings.siteName}}
{% endblock %}

{% block pageBody %}
    <h1>Posts tagged with &ldquo;{{tag}}&rdquo;</h1>

    {% include "partials/pagination-stats.swig" %}
    {% include "partials/pagination.swig" %}

    <section class="posts">
        {% for post in posts %}
            {% include "partials/post.swig" with post %}
        {% endfor %}
    </section>

    {% include "partials/pagination.swig" %}
{% endblock %}
