const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');
const SubCategory = require("./sub_category");

const Product = sequelize.define('Product', {
    product_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    vendor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'vendors',
            key: 'vendor_id'
        },
        onDelete: 'CASCADE'
    },
    sub_category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'sub_category',
            key: 'sub_category_id'
        },
        onDelete: 'CASCADE'
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    main_image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cover_images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        defaultValue: 'pending'
    },
    is_bestseller: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'product',
    timestamps: true
});

Product.belongsTo(SubCategory, { foreignKey: "sub_category_id" }); // ✅ Define the association
SubCategory.hasMany(Product, { foreignKey: "sub_category_id" });
// sync model with database
sequelize.sync()
    .then(() => {
        console.log("Product table is created")
    })
    .catch(err => console.error("❌ Error creating product table:", err));

module.exports = Product;