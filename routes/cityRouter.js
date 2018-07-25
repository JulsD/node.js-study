import express from 'express';
const cityRouter = express.Router();
import { connectDB } from '../models';

cityRouter.route('/api/cities')
    .get((req, res) => {
        connectDB((err, connection) => {
            if (err) throw new Error(err);
            connection.collection('cities').find().toArray(function (err, result) {
                if (err) throw err
            
                res.send(result[Math.floor(Math.random()*result.length)]);
            })
        })
        
    })
    .post((req, res) => {
        res.send({type: "POST"});
    })
    .put((req, res) => {
        res.send({type: "PUT"});
    })
    .delete((req, res) => {
        res.send({type: "DELETE"});
    });

export default cityRouter;