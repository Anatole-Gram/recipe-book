module.exports = (sequelize, DataTypes) => {
    const Ingredient = sequelize.define("ingredient", {
        id: {
            type: DataTypes.INTEGER, 
            autoIncrement: true,
            primaryKey: true,
            allowNull: true,
        },
        recipeId: {
            type: DataTypes.INTEGER, 
            allowNull: false 
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        count: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        unit: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        extras: { 
            type: DataTypes.JSON, 
            allowNull: true,
        }
    });
    return Ingredient;
}