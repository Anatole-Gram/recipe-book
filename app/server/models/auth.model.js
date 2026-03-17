

module.exports = (sequelize, DataTypes) => {
    const Auth = sequelize.define("auth", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER, 
            allowNull: false 
        },
        log: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pas: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return Auth
}