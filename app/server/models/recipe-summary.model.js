module.exports = (sequelize, DataTypes) => {
    const Recipe = sequelize.define("recipe", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        categoryId: { 
            type: DataTypes.INTEGER, 
            allowNull: false 
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        img: {
            type: DataTypes.STRING,
        },
    });
    return Recipe;
}