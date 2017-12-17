import jwt from 'jsonwebtoken';
import config from 'config';

exports.setUserInfo = function(req) {
  console.log('AuthService#setUserInfo, req: ', req);

  return {
    _id: req._id,
    firstName: req.firstName,
    lastName: req.lastName,
    email: req.email
  };
};

exports.generateWebToken = function(user) {
  console.log('AuthService@generateWebToken, user: ', user);

  return jwt.sign(user, config.session.secret, {
    expiresIn: 10080
  });
};
