{% extends "layouts/default.swig" %}

{% block title %}Internal Server Error - {{settings.siteName}}{% endblock %}

{% block pageBody %}
    <h1>500 Internal Server Error</h1>

    <p>
    Well, shit. This wasn't supposed to happen.
    </p>
{% endblock %}
