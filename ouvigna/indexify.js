(function($) {
    $.widget("ouvigna.indexify", {
        $source: null,
        $destination: null,
        mode: null,
        options: {
            source: null,
            destination: null,
            mode: null
        },
    
        _create: function() {
            this._setOptions();
            var items = this._findItems();
            this._buildHTML(items);
        },

        _setOptions: function() {
            this.$destination = this.element;
            this.$source = (this.options.source === null)?
                this.element:
                $(this.options.source);
            this.mode = (this.options.mode === null)?
                "html":
                this.options.mode;
        },

        _findItems: function(level, $from) {
            var headers,
                _self = this,
                items = [];

            level = level === undefined?1:level;
            if (level == 1)
            {
                headers = $("h" + level, this.$source);
            }
            else
            {
                $limit = $($from.nextAll("h" + (level-1)).get(0));
                headers = $from.nextUntil($limit, "h" + level);
            }
            headers.each(function() {
                var $this = $(this);
                items.push({"$element": $this,
                            "children": _self._findItems(level + 1, $this)});
            });

            return items;
        },

        _buildHTML: function(items) {
            var $listItems = $("<ul>");
            $.each(items, function() {
                var $item = $("<li>").
                    html(this.$element.html()).
                    appendTo($listItems);
            });

            if (typeof this.$destination[this.mode] === "function")
            {
                this.$destination[this.mode]($listItems);
            }
        }
    });
})(jQuery);
