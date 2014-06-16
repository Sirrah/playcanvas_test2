pc.script.create('fakegravity', function (context) {
    var Fakegravity = function (entity) {
        this.entity = entity;
        
        this.gravityEnabled = false;
        
        // TODO make list of sources or move script to the gravity field it self
        // after all, the gravity behaviour is a property of the field, not of the player
        this.gravitySource = null;
        
        this.force = 1000;
    };

    Fakegravity.prototype = {
        initialize: function () {
            this.entity.collision.on('triggerenter', this.onGravityFieldEnter, this);
            this.entity.collision.on('triggerleave', this.onGravityFieldLeave, this);
        },

        update: function (dt) {
            if (!this.gravityEnabled)
                return;
            
            var gravityVec = this.gravitySource.getPosition().clone();
            gravityVec.sub(this.entity.getPosition());
            gravityVec.normalize();
            
            // TODO scale force based on distance, and mass
            gravityVec.scale(this.force * dt);
            gravityVec.mul(this.gravitySource.getLocalScale());
            
            
            this.entity.rigidbody.applyForce(gravityVec);
        },
        
        onGravityFieldEnter: function (other) {
            if (other.getName() === "GravityField") {
                this.enableGravity(other.getParent());
            }
        },
        
        onGravityFieldLeave: function (other) {
            if (other.getName() === "GravityField") {
                this.disableGravity();
            }
        },
        
        enableGravity: function (gravitySource) {
            this.gravityEnabled = true;
            this.gravitySource = gravitySource;
        },
        
        disableGravity: function () {
            this.gravityEnabled = false;
            this.gravitySource = null;
        }
        
    };

    return Fakegravity;
});