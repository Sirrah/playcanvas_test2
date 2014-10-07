pc.script.create('game', function (context) {
    var Game = function (entity) {
        this.entity = entity;

        this.counter = 0;
        this.templates = null;
    };

    Game.prototype = {
      initialize: function () {
        this.templates = this.entity.findByName('Templates');

        var planetTemplate = this.templates.findByName('Planet');
        var planet = this.instantiateTemplate(planetTemplate, this.entity);
      },

      getInstanceName: function (template) {
        return template.getName() + '_' + this.counter++;
      },

      instantiateTemplate: function (template, parent) {
        var templateInstance = template.clone();
        parent.addChild(templateInstance);

        templateInstance.setName(this.getInstanceName(template));
        templateInstance.setLocalPosition(0, 0 ,0);
        //templateInstance.setLocalEulerAngles(0, 0, 0);
        templateInstance.rigidbody.syncEntityToBody();
        templateInstance.enabled = true;

        return templateInstance;
      },

      update: function (dt) {
      }
    };

    return Game;
});
