'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn('Sessions', 'invalidated', {
      type: Sequelize.BOOLEAN
    });

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.removeColumn('Sessions', 'invalidated');

  }
};
