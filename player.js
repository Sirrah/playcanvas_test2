//pc.script.attribute("thrust", "number", 35);
//pc.script.attribute("torque", "number", 2);

pc.script.create('player', function (context) {
    var Player = function (entity) {
        this.entity = entity;
        this.thrustVec = new pc.Vec3();

        this.thrust = 35;
        this.torque = 2;

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

            if (context.keyboard.isPressed(pc.input.KEY_P)) {
                this.startThrusting();
            } else {
                this.stopThrusting();
            }

            if (context.keyboard.isPressed(pc.input.KEY_R)) {
                this.reset();
            }
        },

        startThrusting: function () {
            //pc.math.vec3.scale(this.entity.up, THRUST_IMPULSE, this.thrust);
            this.thrustVec.copy(this.entity.up).scale(this.thrust);
            this.entity.rigidbody.activate();
            this.entity.rigidbody.applyImpulse(this.thrust);

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
        }
    };

    return Player;
});
