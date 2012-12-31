var _ = require('underscore');

// Creates a new Paginator instance.
//
// items   - Array of items to paginate.
// url     - URL template with a ":page" placeholder where the current page
//           should go.
// options - Options object.
//
function Paginator(items, url, options) {
    options = _.defaults(options || {}, {
        labelNext: 'Older &raquo;',
        labelPrev: '&laquo; Newer',
        page     : 1,
        pageSize : 10
    });

    this.items       = items;
    this.labelNext   = options.labelNext;
    this.labelPrev   = options.labelPrev;
    this.pageSize    = parseInt(options.pageSize, 10);
    this.totalPages  = Math.ceil(items.length / this.pageSize);
    this.page        = Math.max(1, Math.min(this.totalPages, parseInt(options.page, 10)));
    this.isFirstPage = this.page === 1;
    this.url         = url;
}

Paginator.prototype = {
    // -- Properties -----------------------------------------------------------

    // Returns the URL for the current page.
    get currentUrl () {
        return this.formatUrl();
    },

    // Returns the zero-based index of the first item on this page.
    get firstIndex () {
        return Math.max(0, (this.page - 1) * this.pageSize)
    },

    // Returns the one-based index of the first item on this page, suitable for
    // display.
    get firstIndexDisplay () {
        return this.firstIndex + 1;
    },

    // Returns the total number of items.
    get itemCount () {
        return this.items.length;
    },

    // Returns the zero-based index of the last item on this page.
    get lastIndex() {
        return Math.min(this.items.length, this.firstIndex + this.pageSize) - 1;
    },

    // Returns the one-based index of the last item on this page, suitable for
    // display.
    get lastIndexDisplay() {
        return this.lastIndex + 1;
    },

    // Returns an array of objects representing navigation links for up to five
    // pages before, after, and including the current page, or returns an empty
    // array if the current page is the only page and no navigation links are
    // needed.
    get navigation () {
        if (this.totalPages === 1) {
            return [];
        }

        var pages = [],
            start = Math.max(1, this.page - 5),
            end   = Math.min(this.totalPages + 1, start + 10),
            i;

        for (i = start; i < end; i++) {
            pages.push({
                isCurrentPage: i === this.page,
                page         : i,
                url          : this.formatUrl(i)
            });
        }

        return pages;
    },

    // Returns the number of the next page, or `null` if the current page is the
    // last page.
    get nextPage () {
        return this.page < this.totalPages ? this.page + 1 : null;
    },

    // Returns the URL for the next page, or `null` if the current page is the
    // last page.
    get nextUrl () {
        var nextPage = this.nextPage;
        return nextPage ? this.formatUrl(nextPage) : null;
    },

    // Returns the number of the previous page, or `null` if the current page is
    // the first page.
    get prevPage () {
        return this.page > 1 ? this.page - 1 : null;
    },

    // Returns the URL for the previous page, or `null` if the current page is
    // the first page.
    get prevUrl () {
        var prevPage = this.prevPage;
        return prevPage ? this.formatUrl(prevPage) : null;
    },

    // -- Methods --------------------------------------------------------------

    // Returns the URL for the given page number, or the current page if no
    // number is given.
    formatUrl: function (page) {
        page || (page = this.page);
        return this.url.replace(':page', page);
    },

    // Returns the items on the current page.
    itemsOnPage: function () {
        return this.items.slice(this.firstIndex, this.lastIndex + 1);
    }
};

module.exports = Paginator;
