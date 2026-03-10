
module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define("category", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return Category;
}