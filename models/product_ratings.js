const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');
const Product = require('./product');

const ProductRatings = sequelize.define('ProductRatings', {
    rating_id: { 
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
        } 
    },
    user_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { 
            model: 'auth_app_customuser', 
            key: 'id' 
        } 
    },
    rating_value: { 
        type: DataTypes.FLOAT, 
        allowNull: false, 
        validate: { 
            min: 0, 
            max: 5 
        } 
    },
}, { 
    tableName: 'product_ratings', 
    timestamps: true 
});

ProductRatings.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

// sync model with database
sequelize.sync({ alter: true})
    .then(() => {
        console.log("Product Ratings table is created")
    })
    .catch(err => console.error("❌ Error creating product-ratings table:", err));

module.exports = ProductRatings;