<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>{% block title %}{{settings.siteName}}{% endblock %}</title>

    {% block head %}
        <meta name="viewport" content="width=device-width">

        <link rel="stylesheet" href="/css/core.css">
        <link rel="alternate" type="application/rss+xml" href="/rss">
    {% endblock %}
</head>
<body>

{% block body %}
    <div id="doc">
        {% block pageHeader %}
            {% include "partials/page-header.swig" %}
        {% endblock %}

        <div id="bd">
            {% block pageBody %}{% endblock %}
        </div>

        {% block pageFooter %}
            {% include "partials/page-footer.swig" %}
        {% endblock %}
    </div>

    {% block js %}{% endblock %}
{% endblock %}

</body>
</html>
