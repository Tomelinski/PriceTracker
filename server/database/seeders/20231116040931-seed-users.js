const { bcrypt, saltRounds } = require('../config/bcryptConfig.js');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('password', saltRounds);

    await queryInterface.bulkInsert("Users", [
      {
        name: "John Doe",
        password: hashedPassword,
        emailAddress: 'johndoe@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Jane Smith",
        password: hashedPassword,
        emailAddress: 'janesmith@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
