const User = require('./model');

// if error is thrown, catch it and send it to the client
// returns payload in data
const register = (req, res) => {
    const { name, email, password } = req.body;
    // create user if not exist check with email
    User.findOne({ email }, (err, user) => {
        if (err) {
            res.status(500).send({ message: 'Internal server error', error: err });
        } else if (user) {
            res.status(400).send({ message: 'User already exists' });
        }
        // create new user
        else {
            const newUser = new User({ name, email, password });
            newUser.save((err, user) => {
                if (err) {
                    res.status(500).send({ message: 'Internal server error', error: err });
                } else {
                    res.status(201).send(user);
                }
            });
        }
    });
}

const login = (req, res) => {
    const { email, password } = req.body;
    // find with email and password
    User.findOne({ email, password }, (err, user) => {
        if (err) {
            res.status(500).send({ message: 'Internal server error', error: err });
        }
        // if user not found
        else if (!user) {
            res.status(400).send({ message: 'User not found' });
        }
        // if user found
        else {
            res.status(200).send(user);
        }
    });
}


module.exports = {
    register,
    login
}