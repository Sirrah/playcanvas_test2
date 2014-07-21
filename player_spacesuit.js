pc.script.create('player_spacesuit', function (context) {
    var PlayerSpaceSuit = function (entity) {
        this.entity = entity;
    };

    PlayerSpaceSuit.prototype = {
        initialize: function () {
        },

        update: function (dt) {
            // board the spaceship
            if (context.keyboard.isPressed(pc.input.KEY_L)) {
                entity.destroy();
            }
        },
    };

    return PlayerSpaceSuit;
});