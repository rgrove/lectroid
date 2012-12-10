{% if pagination %}
    <div class="pg">
        {% if pagination.prevUrl %}
            <a rel="prev" class="prev" href="{{pagination.prevUrl}}">
                {{pagination.labelPrev|raw}}
            </a>
        {% endif %}

        {# TODO: figure out why the number of pages seems to increase after reloading in dev mode #}
        {% for page in pagination.navigation %}
            {% if page.isCurrentPage %}
                <strong>{{page.page}}</strong>
            {% else %}
                <a href="{{page.url}}">{{page.page}}</a>
            {% endif %}
        {% endfor %}

        {% if pagination.nextUrl %}
            <a rel="next" class="next" href="{{pagination.nextUrl}}">
                {{pagination.labelNext|raw}}
            </a>
        {% endif %}
    </div>
{% endif %}
