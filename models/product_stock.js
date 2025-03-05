const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');
const Product = require('./product');

const ProductStock = sequelize.define('ProductStock', {
    stock_id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    product_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { 
            model: 'product', 
            key: 'product_id' 
        },
        onDelete: 'CASCADE'
    },
    stock: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        defaultValue: 0 
    },
    availability_status: { 
        type: DataTypes.ENUM('in-stock', 'out-of-stock'), 
        allowNull: false
    },
}, { 
    tableName: 'product_stock', 
    timestamps: false
});

ProductStock.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

// sync model with database
sequelize.sync({ alter: true})
    .then(() => {
        console.log("Product Stock table is created")
    })
    .catch(err => console.error("❌ Error creating product-stock table:", err));

module.exports = ProductStock;