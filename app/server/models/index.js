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

db.category = require("./user.model.js")(sequelize, Sequelize);
db.category = require("./recipe-category.model.js")(sequelize, Sequelize);
db.recipe = require("./recipe-summary.model.js")(sequelize, Sequelize);
db.recipeIngredient = require("./recipe-ingredient.model.js")(sequelize, Sequelize);
db.recipeStep = require("./recipe-step.model.js")(sequelize, Sequelize);



db.category.hasMany(db.recipe, { as: 'recipes', foreignKey: 'categoryId', onDelete: 'CASCADE' });
db.recipe.belongsTo(db.category, { as: 'category', foreignKey: 'categoryId' });

db.recipe.hasMany(db.recipeIngredient, { as: 'ingredients', foreignKey: 'recipeId', onDelete: 'CASCADE' });
db.recipeIngredient.belongsTo(db.recipe, { as: 'recipe', foreignKey: 'recipeId' });

db.recipe.hasMany(db.recipeStep, { as: 'steps', foreignKey: 'recipeId', onDelete: 'CASCADE' });
db.recipeStep.belongsTo(db.recipe, { as: 'recipe', foreignKey: 'recipeId' });

module.exports = db;