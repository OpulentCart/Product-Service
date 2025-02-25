const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');
const Product = require('./product');

const Wishlist = sequelize.define('Wishlist', {
    wishlist_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'auth_app_customuser',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'product',
            key: 'product_id'
        },
        onDelete: 'CASCADE'
    }
}, {
    tableName: 'wishlist',
    timestamps: true
});

Wishlist.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

// sync model with database
sequelize.sync({ alter: true})
    .then(() => {
        console.log("Wishlist table is created")
    })
    .catch(err => console.error("❌ Error creating wishlist table:", err));

module.exports = Wishlist;