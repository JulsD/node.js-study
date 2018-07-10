import Sequelize from 'sequelize';
const sequelize = new Sequelize('nodestudy', 'postgres', 'postgress', {
    host: 'localhost',
    dialect: 'postgres'
});

const models = {
    user: sequelize.import('./User.js'),
    product: sequelize.import('./Product.js')
};

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;