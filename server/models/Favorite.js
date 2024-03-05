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
    }
};

module.exports = (sequelize) => {
    const Favorite = sequelize.define('Favorites', FAVORITE_ATTRIBUTES, {
        timestamps: false,
        primaryKey: true,
        unique: 'favoritedItem',
    });

    Favorite.belongsTo(sequelize.models.User, { foreignKey: 'userId' });
    Favorite.belongsTo(sequelize.models.Item, { foreignKey: 'itemId' });

    return Favorite;
};

module.exports.FAVORITE_ATTRIBUTES = FAVORITE_ATTRIBUTES;