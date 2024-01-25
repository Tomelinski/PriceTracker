const { DataTypes } = require('sequelize');

const ITEM_ATTRIBUTES = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    retailer: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    inStoreOnly: {
        type: DataTypes.BOOLEAN,
        default: false
    },
    specifications: {
        type: DataTypes.JSON,
        defaultValue: [],
    },
    price: {
        type: DataTypes.DECIMAL(12,2),
        defaultValue: null,
        allowNull: true,
    },
    priceHistory: {
        type: DataTypes.JSON,
        defaultValue: [],
    },
    siteURL: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imageURL: {
        type: DataTypes.STRING,
        allowNull: true,
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
