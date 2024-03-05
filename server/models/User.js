const { DataTypes } = require("sequelize");
const { bcrypt, saltRounds } = require("../database/config/bcryptConfig.js");

const USER_ATTRIBUTES = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emailAddress: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      notEmpty: true,
    },
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
};

module.exports = (sequelize) => {
  const User = sequelize.define("User", USER_ATTRIBUTES, {
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(saltRounds);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed("password") && user.password) {
          const salt = await bcrypt.genSalt(saltRounds);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Favorite, { foreignKey: 'userId' });
  };

  return User;
};

module.exports.USER_ATTRIBUTES = USER_ATTRIBUTES;
