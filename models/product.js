const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');

const Product = sequelize.define('products', {
    product_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    vendor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'vendor',
            key: 'vendor_id'
        },
        onDelete: 'CASCADE'
    }, 
    category_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'category',
            key: 'category_id',
        },
        onDelete: 'CASCADE'
    },
    product_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: true
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cover_image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sub_images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: []
    },
    likes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        defaultValue: 'pending'
    }
},{
    tableName: 'products',
    timestamps: true
});

// Associations
Category.hasMany(Product, { foreignKey: "category_id", onDelete: "CASCADE" });
Product.belongsTo(Category, { foreignKey: "category_id" });
Vendor.hasMany(Product, { foreignKey: "vendor_id", onDelete: "CASCADE" });
Product.belongsTo(Vendor, { foreignKey: "vendor_id" });

module.exports = Product;