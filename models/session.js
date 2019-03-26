'use strict';

import * as uuid from 'uuid';

import * as moment from 'moment';

module.exports = (sequelize, DataTypes) => {
  var Session = sequelize.define('Session', {
    token: DataTypes.STRING,
    expires: DataTypes.DATE,
    account_id: DataTypes.STRING,
    invalidated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {

    hooks: {

      beforeCreate: (record) => {

        if (!record.expires) {

          record.expires = moment().add(15, 'minutes');

        }
    
        record.token = uuid.v4();

      }

    },

    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Session;
};
