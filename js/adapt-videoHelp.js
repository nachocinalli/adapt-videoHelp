define(function(require) {

    var Adapt = require('coreJS/adapt');
    var ComponentModel = require('coreModels/componentModel')
    var VideoHelpView = require('extensions/adapt-videoHelp/js/adapt-videoHelpView');
    var VideoHelpNotifyView = require('extensions/adapt-videoHelp/js/adapt-videoHelpNotifyView');
    var NotifyModel = require("coreModels/notifyModel")

    function openHelp() {
        new VideoHelpNotifyView({ model: new NotifyModel({ _type: "popup", _componentModel: new ComponentModel(Adapt.course.get('_videoHelp')) }) })
    }

    Adapt.on('app:dataReady', function() {
        var VideoHelp = Adapt.course.get('_videoHelp');
        if (VideoHelp && VideoHelp._isEnabled) {
            Adapt.on('navigationView:postRender', function(navigationView) {
                navigationView.$('.navigation-inner').append(new VideoHelpView({ model: VideoHelp }).$el);
                this.listenTo(Adapt, "videoHelp:open", openHelp);
                if (!Adapt.offlineStorage.get("_helpOpened")) {
                    Adapt.offlineStorage.set("_helpOpened", true)
                    Adapt.trigger('videoHelp:open');
                }
            });
        }
    })
});