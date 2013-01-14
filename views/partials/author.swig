{#
Hidden <address> element solely for compliance with the hAtom spec, which
requires an author vcard.
#}
<address class="vcard author" style="display:none">
    <a class="email fn" href="mailto:{{settings.authorEmail}}">
        {{settings.author}}
    </a>
</address>
