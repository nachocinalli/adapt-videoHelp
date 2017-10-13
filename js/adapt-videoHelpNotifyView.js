define(function (require) {
    var Adapt = require('coreJS/adapt');
    var NotifyView = require('coreViews/notifyView');

    var VideoHelpNotifyView = NotifyView.extend({

        className: 'notify video-helpNotifyView',

        render: function () {
            var data = this.model.toJSON()
            var template = Handlebars.templates['notify'];
            this.$el.css("visibility", "hidden").html(template(data)).appendTo("body"),
                this.$(".notify-popup").css("visibility", "hidden"),
                this.$el.css("visibility", "visible");

            var _componentModel = this.model.get('_componentModel')
            _componentModel.set("_type", "component")
            _componentModel.set("_component", "media")
            _componentModel.set("_layout", "full")
            var _popupContent=""
            if (!Adapt.componentStore.media)
            {
                var templateMedia = Handlebars.templates['videoHelpMedia'];
                _popupContent = templateMedia(_componentModel.toJSON());
            }
            else
            {
                var Media = Adapt.componentStore.media;
                _popupContent = new Media({ model: _componentModel }).$el
               
            }
            this.$(".notify-popup-content").html(_popupContent);
           
                _.defer(_.bind(function () {
                    this.showNotify()
                }, this))

        }

    });
    return VideoHelpNotifyView;

});