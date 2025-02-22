const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");

const Category = sequelize.define('Category', {
    category_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
},{
    tableName: 'category',
    timestamps: true
});

// sync model with database
sequelize.sync({ alter: true})
    .then(() => {
        console.log("Category table is created")
    })
    .catch(err => console.error("❌ Error creating User table:", err));

module.exports = Category;