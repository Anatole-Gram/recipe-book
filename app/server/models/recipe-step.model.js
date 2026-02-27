module.exports = (sequelize, DataTypes) => {
    const Step = sequelize.define("step", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        recipeId: { 
            type: DataTypes.INTEGER, 
            allowNull: false },
        img: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        extras: { 
            type: DataTypes.JSON, 
            allowNull: true, 
        }

    });
    return Step
}