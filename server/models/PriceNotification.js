const { DataTypes } = require('sequelize');

const PRICE_NOTIFICATION_ATTRIBUTES = {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Users',
            key: 'id',
        },
    },
    itemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Items',
            key: 'id',
        },
    },
    threshold: {
        type: DataTypes.DECIMAL(12, 2),
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
    const PriceNotification = sequelize.define('Price_Notifications', PRICE_NOTIFICATION_ATTRIBUTES, {
        unique: 'notification',
    });

    PriceNotification.belongsTo(sequelize.models.User, { foreignKey: 'userId' });
    PriceNotification.belongsTo(sequelize.models.Item, { foreignKey: 'itemId' });

    return PriceNotification;
};

module.exports.PRICE_NOTIFICATION_ATTRIBUTES = PRICE_NOTIFICATION_ATTRIBUTES;
