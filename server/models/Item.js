const { DataTypes } = require('sequelize');

const ITEM_ATTRIBUTES = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    specifications: {
        type: DataTypes.JSON,
        defaultValue: [],
    },
    priceHistory: {
        type: DataTypes.JSON,
        defaultValue: [],
    },
    siteURL: {
        type: DataTypes.STRING,
        allowNull: false,
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
    const Item = sequelize.define('Item', ITEM_ATTRIBUTES);
  
    return Item;
  };

module.exports.ITEM_ATTRIBUTES = ITEM_ATTRIBUTES
