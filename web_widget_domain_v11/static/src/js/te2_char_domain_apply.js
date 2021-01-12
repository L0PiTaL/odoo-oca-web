odoo.define('te2_base.char_domain_apply', function(require) {
    "use strict";

    var ListView = require('web.ListView');
    var Model = require('web.DataModel');
    var core = require('web.core');

    //We require the new field domain introduced in web_widget_domain_v11. This one overrides the core 'char_domain'
    var correct_field=require('web_widget_domain_v11.field')

    var FieldCharDomainApply = core.form_widget_registry.get('char_domain').include({
        template: "FieldDomainApply",
        events: {
            'click .o_domain_apply': 'on_apply_click'
        },
        init: function() {
            this._super.apply(this, arguments);
            this.options = _.defaults(this.options || {}, {
                must_apply: false,
            });
            this.allow_set_value=false;
        },
        render_value: function() {
            this._super.apply(this, arguments);
            if (this.options.must_apply) {
                this.$el.css('flex-wrap', 'wrap');
            } else {
                this.$(".o_domain_apply_div").toggleClass("o_hidden", true);
            }
        },
        on_apply_click: function(event) {
            event.preventDefault();

            this.allow_set_value=true;
            try {
                this.set_value(this.latest_value);
            } finally {
                this.allow_set_value=false;
            }
        },

        set_value: function(value_) {
            var should_set_value=this.allow_set_value || !this.options.must_apply;
            if (this.latest_value===undefined)
                should_set_value=true;

            this.latest_value=value_;
            if (should_set_value)
                this._super(value_);
        }
    });
});
