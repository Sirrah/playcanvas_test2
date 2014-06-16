pc.script.create('game', function (context) {
    // Creates a new Game instance
    var Game = function (entity) {
        this.entity = entity;
        
        this.asteroidTemplate = null;
    };

    Game.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.asteroidTemplate = this.entity.findByName('AsteroidTemplate');
            this.asteroidTemplate.enabled = false;
            
            /*for (var i=0; i<5; i++) {
                //pc.math.random(min, max)
                var asteroid1 = this.asteroidTemplate.clone();
                this.entity.getParent().addChild(asteroid1);
                asteroid1.setName("Asteroid" + i);
                asteroid1.setLocalPosition(15*i, 0 ,0);
                asteroid1.setLocalEulerAngles(0, 10*i, 0);
                asteroid1.rigidbody.syncEntityToBody();
                asteroid1.enabled = true;
            }*/
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
    };

    return Game;
});