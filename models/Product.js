export default (sequelize, DataTypes) => {
    const Product = sequelize.define('product', {
        // id: {
        //     type: DataTypes.UUID,
        //     unique: true
        // },
        name: {
            type: DataTypes.STRING
        },
        color: {
            type: DataTypes.STRING
        },
        reviews: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        }
    });

    return Product;
}