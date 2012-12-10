{% if pagination %}
    <div class="pg">
        {% if pagination.prevUrl %}
            <a rel="prev" class="prev" href="{{pagination.prevUrl}}">
                {{pagination.labelPrev|raw}}
            </a>
        {% endif %}

        {% if pagination.navigation %}
            {% if pagination.isCurrentPage %}
                <strong>{{pagination.page}}</strong>
            {% else %}
                <a href="{{pagination.url}}">{{pagination.page}}</a>
            {% endif %}
        {% endif %}

        {% if pagination.nextUrl %}
            <a rel="next" class="next" href="{{pagination.nextUrl}}">
                {{pagination.labelNext|raw}}
            </a>
        {% endif %}
    </div>
{% endif %}
