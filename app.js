import config from './config/app.config.json';
console.log(config.name);

import express from 'express';
import bodyParser from 'body-parser';
import { authRouter, productRouter, userRouter } from './routes';
import { tokenCheck, queryParser, cookieParser, cookieLog } from './middlewares'

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

// parsers
app.use(bodyParser.json(), queryParser, cookieParser);

// auth route
app.all('/auth', authRouter);

// middlevares for other rotes
app.use(tokenCheck, productRouter, userRouter);

export default app;
