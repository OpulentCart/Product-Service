const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');
const Category = require('./category');

const subCategory = sequelize.define('subCategory', {
    sub_category_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        primaryKey: true,
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
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'sub_category',
    timestamps: true
});

Category.hasMany(subCategory, {foreignKey: 'category_id', onDelete: 'CASCADE'});
subCategory.belongsTo(Category, { foreignKey: 'category_id' });

// sync model with database
sequelize.sync({ alter: true})
    .then(() => {
        console.log("Sub-Category table is created")
    })
    .catch(err => console.error("❌ Error creating sub-category table:", err));

    module.exports = subCategory;
