pc.script.create('orbit', function (context) {
    // Creates a new Orbit instance
    var Orbit = function (entity) {
        this.entity = entity;
    };

    Orbit.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
    };

    return Orbit;
});