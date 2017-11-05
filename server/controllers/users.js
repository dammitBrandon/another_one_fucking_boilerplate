import User from 'server/models/users';

exports.register = function(req, candidateUser) {
  console.log('UserController#register: ', candidateUser);
  User.create({
    email: candidateUser.registrationForm.form.emailAddress,
    password: candidateUser.registrationForm.form.password
  },
    (err, user) => {
      if (err) { console.log('Failed to create new user, err: ', err); }

      console.log('new user: ', user);
    })
    .then(user => {return user;});
};
