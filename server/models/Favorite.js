const { DataTypes } = require('sequelize');

const FAVORITE_ATTRIBUTES = {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'Users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  itemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'Items',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
};

module.exports = (sequelize) => {
  const Favorite = sequelize.define('Favorite', FAVORITE_ATTRIBUTES, { timestamps: false });

  Favorite.associate = (models) => {
    models.Favorite.belongsTo(models.User, { foreignKey: 'userId' });
    models.Favorite.belongsTo(models.Item, { foreignKey: 'itemId' });
  };

  return Favorite;
};

module.exports.FAVORITE_ATTRIBUTES = FAVORITE_ATTRIBUTES;
