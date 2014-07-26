pc.script.create('game', function (context) {
    var Game = function (entity) {
        this.root = entity;
        this.counter = 0;

        this.templates = null;
    };

    Game.prototype = {
      initialize: function () {
        this.templates = this.root.findByName('Templates')

        var planetTemplate = this.templates.findByName('Planet');
        var planet = this.instantiateTemplate(planetTemplate, this.root);
      },

      getInstanceName: function (template) {
        return template.getName() + '_' + this.counter++;
      },

      instantiateTemplate: function (template, parent) {
        var entity = template.clone();
        parent.addChild(entity);

        entity.setName(this.getInstanceName(template));
        entity.setLocalPosition(0, 0 ,0);
        //entity.setLocalEulerAngles(0, 0, 0);
        entity.rigidbody.syncEntityToBody();
        entity.enabled = true;

        return entity;
      },

      update: function (dt) {
      }
    };

    return Game;
});
