const { DataTypes } = require("sequelize");

const PRICE_NOTIFICATION_ATTRIBUTES = {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: "Users",
      key: "id",
    },
  },
  itemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: "Items",
      key: "id",
    },
  },
  threshold: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
  },
  frequency: {
    allowNull: false,
    type: DataTypes.DATE,
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
  const PriceNotification = sequelize.define(
    "PriceNotification",
    PRICE_NOTIFICATION_ATTRIBUTES
  );

  PriceNotification.associate = (models) => {
    models.PriceNotification.belongsTo(models.User, { foreignKey: "userId" });
    models.PriceNotification.belongsTo(models.Item, { foreignKey: "itemId" });
  };

  return PriceNotification;
};

module.exports.PRICE_NOTIFICATION_ATTRIBUTES = PRICE_NOTIFICATION_ATTRIBUTES;
