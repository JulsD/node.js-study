import Sequelize from 'sequelize';
const sequelize = new Sequelize('nodestudy', 'postgres', 'postgress', {
    host: 'localhost',
    dialect: 'postgres'
});

const models = {
    user: sequelize.import('./user.js'),
    product: sequelize.import('./product.js')
};

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;