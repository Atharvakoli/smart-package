import { Trip } from "./trip";
import { User } from "./User";
import { UserPreferences } from "./UserPreferences";



User.hasMany(UserPreferences, {
  foreignKey: "user_id",
  as: "preferences",
});

User.hasMany(Trip, {
  foreignKey: "user_id",
  as: "travels",
});

UserPreferences.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});


Trip.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

export { User, UserPreferences, Trip };
