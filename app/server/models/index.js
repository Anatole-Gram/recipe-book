const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USERNAME, dbConfig.PASSWORD, {
  dialect: dbConfig.DIALECT,
  host: dbConfig.HOST,
  port: dbConfig.PORT
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.auth = require("./auth.model.js")(sequelize, Sequelize);
db.recipe = require("./recipe.model.js")(sequelize, Sequelize);
db.recipeStep = require("./recipe-step.model.js")(sequelize, Sequelize);
db.user.hasOne(db.auth, {onDelete: "cascade"});
db.user.hasMany(db.recipe);
db.recipe.hasMany(db.recipeStep, {onDelete: "cascade"});

module.exports = db