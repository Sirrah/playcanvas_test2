pc.script.create('gravityfield', function (context) {
    // Creates a new Gravityfield instance
    var Gravityfield = function (entity) {
        this.entity = entity;
    };

    Gravityfield.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
    };

    return Gravityfield;
});