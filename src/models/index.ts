import User from "./User";
import Clothing from "./Clothing";
import UserPreferences from "./UserPreferences";
import Travel from "./trip";

User.hasMany(UserPreferences, {
  foreignKey: "user_id",
  as: "preferences",
});

User.hasMany(Travel, {
  foreignKey: "user_id",
  as: "travels",
});

UserPreferences.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

UserPreferences.belongsToMany(Clothing, {
  through: "UserClothingPreferences",
  foreignKey: "user_preference_id",
  otherKey: "clothing_id",
  as: "preferredClothing",
});

Clothing.belongsToMany(UserPreferences, {
  through: "UserClothingPreferences",
  foreignKey: "clothing_id",
  as: "userPreferences",
});

Travel.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

export { User, Clothing, UserPreferences, Travel };
