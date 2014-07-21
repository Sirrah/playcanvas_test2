pc.script.create('player_spacesuit', function (context) {
    var PlayerSpaceSuit = function (entity) {
        this.entity = entity;
    };

    PlayerSpaceSuit.prototype = {
        initialize: function () {
        },

        update: function (dt) {
            // board the spaceship
            if (context.keyboard.wasReleased(pc.input.KEY_L)) {
                this.entity.destroy();

                // TODO check for a suitable target to be in range
                var playerShip = context.root.findByName('Player');
                playerShip.script.player.isOccupied = true;
            }
        },
    };

    return PlayerSpaceSuit;
});