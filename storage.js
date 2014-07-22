pc.script.create('storage', function (context) {
    var Storage = function (entity) {
      this.entity = entity;

      // The contents of this Storage should be transferred on boarding another entity
      this.storage = {};
    };

    Storage.prototype = {
        initialize: function () {
        },

        update: function (dt) {
        }
    };

    return Storage;
});
