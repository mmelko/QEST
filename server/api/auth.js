
var Credentials = require('../models/credentials');
module.exports = {
    authenticate: function (jwt, supersecret) {
        return function (req, resp) {
            var user = req.body.username


            //get user from DB 
            Credentials.findOne({ username: req.body.username }, function (err, res) {
                if (err) {
                    console.log(err);
                }
                user = res;
                if (user) {
                    if ((req.body.username === user.username) && (req.body.password === user.password)) {
                        var token = jwt.sign({
                            username: user.username,
                            role: user.role,
                        }, supersecret, { expiresIn: '100m' });
                        resp.json({
                            success: true,
                            message: 'Enjoy your token!',
                            token: token
                        });
                    }
                } else {
                    resp.json({ success: false, message: 'Authentication failed. Wrong username or password.' });
                }
            }
            );
        }
    },
    verifyToken: function (jwt, supersecret) {
        return function (req, res, next) {
            console.log("Processing route");
            //   verify token

            var token = req.body.token || req.query.token || req.headers['x-access-token'];

            if ((req.headers.authorization) && (req.headers.authorization.split(' ')[0] === 'Bearer'))
                token = req.headers.authorization.split(' ')[1];
            // decode token
            if (token) {
                // verifies secret and checks exp
                jwt.verify(token, supersecret, function (err, decoded) {
                    if (err) {
                        return res.status(403).send({ success: false, message: 'Failed to authenticate token.' });

                    } else {
                        // if everything is good, save to request for use in other routes
                        req.decoded = decoded;
                        next();
                    }
                });

            } else {

                // if there is no token
                // return an error
                return res.status(403).send({
                    success: false,
                    message: 'No token provided.'
                });

            }
        }
    },
    requireAdmin: function (req, resp, next) {
        if ((req.decoded) && (req.decoded.role === 'admin')) {
            next();
            console.log("logged as admin");
        }
        else
            resp.status(401).send({ success: false, message: 'Permission denied.' })
    }
};



