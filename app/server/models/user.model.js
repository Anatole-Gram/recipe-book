module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        }, 
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        secondName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });
    return User
}