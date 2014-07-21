pc.script.attribute("thrust", "number", 35);
pc.script.attribute("torque", "number", 2);

pc.script.create('player', function (context) {
    var Player = function (entity) {
        this.entity = entity;
        this.thrustVec = new pc.Vec3();

        this.flame = null;
        this.light = null;

        this.thrusting = false;
        this.dead = false;
    };

    Player.prototype = {
        initialize: function () {
            this.flame = this.entity.findByName('Flame');
            this.light = this.entity.findByName('Light');

            this.reset();

            this.trigger = context.root.findByName('Trigger');
            this.trigger.collision.on('triggerleave', this.onLeaveScene, this);

            this.entity.collision.on('collisionstart', this.onAsteroidCollision, this);
        },

        reset: function () {
            this.dead = false;
            this.thrusting = true; // will be set to false by stopThrusting
            this.stopThrusting();

            this.entity.setPosition(0, 10, 0);
            this.entity.setEulerAngles(0, 10, 0);
            this.entity.rigidbody.syncEntityToBody();

            this.entity.rigidbody.linearVelocity = pc.Vec3.ZERO;
            this.entity.rigidbody.angularVelocity = pc.Vec3.ZERO;
        },

        update: function (dt) {
            if (this.dead) {
                return;
            }

            if (context.keyboard.isPressed(pc.input.KEY_LEFT)) {
                this.entity.rigidbody.applyTorqueImpulse(0, 0, this.torque);
            }

            if (context.keyboard.isPressed(pc.input.KEY_RIGHT)) {
                this.entity.rigidbody.applyTorqueImpulse(0, 0, -this.torque);
            }

            if (context.keyboard.isPressed(pc.input.KEY_UP)) {
                this.startThrusting();
            } else {
                this.stopThrusting();
            }

            // Launch spacesuit
            if (context.keyboard.isPressed(pc.input.KEY_L)) {
                this.launch();
            }

            if (context.keyboard.isPressed(pc.input.KEY_R)) {
                this.reset();
            }
        },

        startThrusting: function () {
            this.thrustVec.copy(this.entity.up).scale(this.thrust);
            this.entity.rigidbody.applyImpulse(this.thrustVec);

            if (!this.thrusting) {
                this.thrusting = true;

                this.flame.enabled = true;
                this.light.enabled = true;

                this.entity.audiosource.loop = true;
                this.entity.audiosource.play("thruster");
            }
        },

        stopThrusting: function () {
            if (this.thrusting) {
                this.thrusting = false;

                this.flame.enabled = false;
                this.light.enabled = false;

                this.entity.audiosource.stop();
            }
        },

        explode: function () {
            if (!this.dead) {
                this.dead = true;

                this.stopThrusting();

                this.entity.audiosource.loop = false;
                this.entity.audiosource.play("explode");

                setTimeout(function () {
                    this.reset();
                }.bind(this), 2000);
            }

        },

        onLeaveScene: function (other) {
            if (this.entity === other) {
                this.reset();
            }
        },

        onAsteroidCollision: function (result) {
            //if (result.other.getName().startsWith('Asteroid')) {
                //this.explode();
            //}
        },

        launch: function () {
            var template = context.root.findByName('SpaceSuitTemplate');

            var playerSpaceSuit = template.clone();
            context.root.addChild(playerSpaceSuit);
            playerSpaceSuit.setName("PlayerSpaceSuit");
            playerSpaceSuit.setLocalPosition(this.entity.getLocalPosition());
            playerSpaceSuit.translate(0, 2, 0); // TODO translate in the direction of the airlock
            playerSpaceSuit.rigidbody.syncEntityToBody();
            playerSpaceSuit.enabled = true;
        }

    };

    return Player;
});
