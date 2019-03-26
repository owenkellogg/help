'use strict';
module.exports = (sequelize, DataTypes) => {
  var Account = sequelize.define('Account', {
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    is_email_verified: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Account;
};
