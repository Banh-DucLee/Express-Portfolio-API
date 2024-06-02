const User = require('../models/user_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
        .then( user => {
            if (!user) {
                return res.status(400).json({
                    error: 'Invalid Credentials'
                });
            }

            bcrypt.compare(req.body.password, user.password)
                .then( valid => {
                    if (!valid) {
                        return res.status(400).json({
                            error: 'Invalid Credentials'
                        });
                    }
                    res.status(200).json({
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.JWT_SECRET_KEY,
                            { expiresIn: '24h' }
                        )
                    })
                })
                .catch( () => {
                    res.status(400).json({
                        error: 'Invalid Credentials'
                    })
                })
        .catch( () => {
            res.status(400).json({
                error: 'Invalid Credentials'
            })
        })
    })
};