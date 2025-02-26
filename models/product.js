const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');

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
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'category',
            key: 'category_id'
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
    likes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    ratings: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 0,
            max: 5
        }
    }, 
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        defaultValue: 'pending'
    },
    is_bestseller: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    availability_status: {
        type: DataTypes.ENUM('in-stock', 'out-of-stock'),
        allowNull: false
    }
}, {
    tableName: 'product',
    timestamps: true
});

// sync model with database
sequelize.sync({ alter: true})
    .then(() => {
        console.log("Product table is created")
    })
    .catch(err => console.error("❌ Error creating product table:", err));

module.exports = Product;