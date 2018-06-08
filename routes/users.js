const users = express.Router();

users.get('/api/users', (req, res) => {
        res.send('All Users');
    });

export default users;