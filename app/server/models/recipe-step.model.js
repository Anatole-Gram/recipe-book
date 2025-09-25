module.exports = (sequelize, Sequelize) => {
    const Step = sequelize.define("step", {
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
        step: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        photo: {
            type: Sequelize.STRING,
        },
    });
    return Step
}