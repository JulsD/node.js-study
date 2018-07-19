export default (sequelize, DataTypes) => {
    const Product = sequelize.define('product', {
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