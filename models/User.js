export default (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        // id: {
        //     type: DataTypes.UUID,
        //     unique: true
        // },
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

    return User;
}