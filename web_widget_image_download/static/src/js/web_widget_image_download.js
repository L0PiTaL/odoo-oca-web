/* Copyright 2016 Flavio Corpa <flavio.corpa@tecnativa.com>
 * Copyright 2016 Jairo Llopis <jairo.llopis@tecnativa.com>
 * License LGPL-3.0 or later (http://www.gnu.org/licenses/lgpl). */
odoo.define('web_widget_image_download.widget', function (require) {
    'use strict';

    var core = require('web.core');

    core.form_widget_registry.get("image").include({
        render_value: function () {
            this._super();
            var $widget = this.$el.find('.o_form_binary_file_download');
            this.imgSrc = this.$el.find('img[name="' + this.name + '"]')
                .attr('src');

            var filename=""
            if (this.node.attrs.filename!=undefined)
                filename = this.view.datarecord[this.node.attrs.filename];

            $.ajax({
                type: 'HEAD', // Avoid downloading full image, just headers
                url: this.imgSrc,
                complete: function (xhr) {
                    if (filename=="")
                        filename=xhr.getResponseHeader("Content-Type").replace('/', '.')
                    $widget.attr(
                        'download',
                        filename
                    );
                }
            });

            // Replace with jQuery to keep inheritance intact
            if (this.has_custom_image()) {
                this.$el.find('.o_clear_file_button')
                    .removeClass('col-md-offset-5');
            }

            $widget.attr('href', this.imgSrc);
        },

        has_custom_image: function () {
            return this.imgSrc != this.placeholder;
        },
    });
});
