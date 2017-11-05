import bcrypt from 'bcrypt-nodejs';
import mongoose from 'mongoose';
import config from 'config';
import httpStatus from 'http-status';
import passportLocalMongoose from 'passport-local-mongoose';

mongoose.connect(config.mongodb, { useMongoClient: true });

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    index: true
  },
  password: String
});

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) { return next(); }
  bcrypt.genSalt(5, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(this.password, salt, null, (err, hash) => {
      if (err) { return next(err); }
      this.password = hash;
      next();
    });
  });
});

UserSchema.method({});

UserSchema.statics = {
  comparePassword(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) { return cb(err); }
      cb(null, isMatch);
    });
  },

  get(id) {
    return this.findById(id)
      .exec()
      .then(user => {
        if (user) {
          return user;
        }
        const err = new Error('No such user exists!', httpStatus.NOT_FOUND);

        return Promise.reject(err);
      });
  }
};

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

export default mongoose.model('User', UserSchema);
