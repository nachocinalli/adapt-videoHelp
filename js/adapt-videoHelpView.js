define(function(require) {
    var Adapt = require('coreJS/adapt');
    var Backbone = require('backbone');
    var VideoHelpView = Backbone.View.extend({
        tagName: 'button',
        className: 'base video-help-button icon icon-question',
        events: {
            "click":"openVideoHelp"
        },
        
        openVideoHelp: function() {
            Adapt.trigger('videoHelp:open');
        },

    });
    return VideoHelpView;

});