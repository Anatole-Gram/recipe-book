

module.exports = (sequelize, Sequelize) => {
    const Auth = sequelize.define("auth", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        log: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        pas: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });
    return Auth
}