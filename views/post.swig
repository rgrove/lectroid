{% extends "layouts/default.swig" %}

{% block title %}{{post.title}} - {{settings.siteName}}{% endblock %}

{% block pageBody %}
    {% include "partials/post.swig" with post %}
{% endblock %}
