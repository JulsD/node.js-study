export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
      login: {
          type: DataTypes.STRING,
          unique: true
      },
      password: {
          type: DataTypes.STRING
      },
      email: {
          type: DataTypes.STRING,
          unique: true
      },
      username: {
          type: DataTypes.STRING
      }
  });

  User.associate = function(models) {
    // associations can be defined here
  };

  return User;
}