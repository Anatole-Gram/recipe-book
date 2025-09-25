module.exports = (sequelize, Sequelize) => {
    const Recipe = sequelize.define("recipe", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        time: {
            type: Sequelize.INTEGER,
        },
        photo: {
            type: Sequelize.STRING,
        },
    });
    return Recipe
}