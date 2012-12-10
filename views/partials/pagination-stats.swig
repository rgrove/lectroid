{% if pagination %}
    <div class="pg-stats">
        <p>
        Displaying items <strong>{{pagination.firstIndexDisplay}} - {{pagination.lastIndexDisplay}}</strong>
        of <strong>{{pagination.itemCount}}</strong>
        </p>
    </div>
{% endif %}
