/*!
 * jQuery.Fiddler.js [plugin]
 * Written by Yannick Albert
 * A small but beautiful jQuery plugin, written to display all your saved fiddles on jsFiddle.net.
 * http://yckart.com/
 *
 * Copyright (c) 2012 Yannick Albert (http://yckart.com)
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
 * 2012/07/12
*/

;(function ($, window, document, undefined) {
    var Plugin = function(elem, options) {
        this.elem = elem;
        this.$elem = $(elem);
        this.options = options;
        this.metadata = this.$elem.data('jsfiddler-options');
    };

    Plugin.prototype = {
        defaults: {
            // Display Options
            name: "value",
            start: 0,
            limit: 10,
            sort: 'date',
            order: 'asc',

            // List Options
            description: 'true',
            author: 'false',
            url: 'true',
            created: 'true',
            framework: 'false',
            version: 'false',
            latest_version: 'false',
            title: 'true',

            // Search Options
            input: '.jsfiddler-search',

            // Paging
            paging: 'false',
            items: 10,
            controls: '.jsfiddler-controls'
        },
        init: function() {
            this.config = $.extend({}, this.defaults, this.options, this.metadata);
            var self = this;

            var url = "http://jsfiddle.net/api/user/" + this.config.name + "/demo/list.json?callback=?&start="+ this.config.start +"&limit="+ this.config.limit +"&sort="+ this.config.sort +"&order="+ this.config.order +"";
            $.getJSON(url, function(data) {
                var items = [];

                $.each(data.list, function(key, entry) {

                    var uri = entry.url.split('/'),
                        slug = uri[uri.length -2 ];
                    items.push("<li id='" + slug + "' class='item'>");


                    if(self.config.title == 'true') {
                        items.push("<a href='" + entry.url + "'>" + entry.title + "</a> ");
                    }



                    if(self.config.latest_version == 'true') {
                        if(entry.latest_version !== 0) {
                            items.push("<a href='" + entry.url + entry.latest_version + "'>Revision " + entry.latest_version + "</a> ");
                        }
                    }



                    if(self.config.framework == 'true') {
                        items.push(entry.framework);
                    }



                    if(self.config.created == 'true') {
                        items.push("<time date='" + entry.created + "'>" + entry.created + "</time> ");
                    }



                    if(self.config.description == 'true') {
                        items.push("<p>" + entry.description + "</p>");
                    }

                    items.push("</li>");
                });


                var list = '<div class=jsfiddler-list><ol>' + items.join('') + '</ol></div>';
                self.$elem.hide().append(list).show();
                $(".loader").hide();

                /* paging */
                if(self.config.paging == 'true') {
                    var idCounter = 0;
                    var idRefs = [];

                    var linkCounter = 0;

                    self.$elem.find('div').children().each(function() {
                        idCounter++;
                        $(this).attr('id', 'slide-' + idCounter);
                        idRefs.push($(this).attr('id'));
                    });


                    for (var i = 0; i < idRefs.length; i++) {
                        linkCounter++;
                        var id = idRefs.splice(i+1,self.config.items);
                        $(self.config.controls).append("<a href='#" + id + "'>" + linkCounter.toString() + "</a> ");
                    }


                    // go to page by id
                    $(self.config.controls).find('a').bind('click', function() {
                        self.$elem.find("ol").hide();
                        self.$elem.find($(this).attr('href')).parent().show();

                        return false;
                    }).first().click();

                    // go to next page
                    $('.next').click(function() {
                        var cur = self.$elem.find("ol:visible");
                        next = cur.next("ol:lt(" + self.config.items + ")");
                        if (next.length === 0) {
                            next = self.$elem.find("ol:first");
                        }
                        cur.hide();
                        next.show();
                    });

                    // go to previous page
                    $('.prev').click(function() {
                        var cur = self.$elem.find("ol:visible");
                        prev = cur.prev("ol:lt(" + self.config.items + ")");
                        if (prev.length === 0) {
                            prev = self.$elem.find("ol:last");
                        }
                        cur.hide();
                        prev.show();
                    });


                    // split list in some parts
                    var $list = self.$elem.find('div'),
                        group;

                    while ((group = $list.find("li:lt(" + self.config.items + ")").remove()).length) {
                        $('<ol/>').append(group).appendTo(self.$elem);
                    }
                }
            });

            var img = document.createElement("img");
            img.setAttribute("src", "../img/loader.gif");
            img.setAttribute("class", "loader");
            document.getElementById('jsFiddler').appendChild(img);

            /* search */
            $.expr[':'].Contains = function(a, i, m) {
                return (a.textContent || a.innerText || $(a).text() || "").toLowerCase().indexOf(m[3].toLowerCase()) >= 0;
            };

            $(self.config.input).change(function() {
                var filter = $(this).val();
                if (filter) {
                    self.$elem.find("li:not(:Contains(" + filter + "))").hide();
                    self.$elem.find("li:Contains(" + filter + ")").show();
                } else {
                    self.$elem.find("li").show();
                }
                return false;
            }).keyup(function() {
                $(this).change();

            });

            $.fn.clearFocus = function() {
                return this.focus(function() {
                    var v = $(this).val();
                    $(this).val(v === this.defaultValue ? '' : v);
                }).blur(function() {
                    var v = $(this).val();
                    $(this).val(v.match(/^\s+$|^$/) ? this.defaultValue : v);
                });

            };
            $(self.config.input).clearFocus();

            return this;
        }
    };

    Plugin.defaults = Plugin.prototype.defaults;

    $.fn.jsFiddler = function(options) {
        return this.each(function() {
            new Plugin(this, options).init();
        });
    };

    window.jsFiddler = Plugin;
})(jQuery, window, document);