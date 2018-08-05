import config from './config/app.config.json';
console.log(config.name);

import express from 'express';
import bodyParser from 'body-parser';
import { productRouter, userRouter, cityRouter } from './routes';
import { queryParser, cookieParser, cookieLog } from './middlewares'

import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
const swaggerDocument = YAML.load('./api/swagger.yaml');

const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

// setting some cookies to check cookieParser middlevare
app.get('/set-cookie', function(req, res, next){
    res.cookie('cookie_name', 'cookie_value').send('Cookie is set');
    next();
});
app.get('/clear-cookie',function(req, res, next){
    res.clearCookie('cookie_name').send('Cookie cookie_name is cleared');
    next();
});
app.get('/get-cookie', cookieLog);

app.use('/api', bodyParser.json(), queryParser, cookieParser, productRouter, userRouter, cityRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/v1/api', bodyParser.json(), queryParser, cookieParser, productRouter, userRouter, cityRouter);

export default app;
