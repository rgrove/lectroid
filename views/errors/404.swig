{% extends "layouts/default.swig" %}

{% block title %}Not Found - {{settings.siteName}}{% endblock %}

{% block pageBody %}
    <h1>404 Not Found</h1>

    <p>
    The URL <code>{{url}}</code> was not found on this server.
    </p>
{% endblock %}
