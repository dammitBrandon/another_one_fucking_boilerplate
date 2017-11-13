import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    lowercase: true,
    index: true
  },
  phoneNumber: String,
  hashedPassword: String,
  salt: String
}, { timestamps: true });

UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.makeSalt()
      .then(salt => {
        this.salt = salt;
        this.hashedPassword = this.encryptPassword(password);
      });
  })
  .get(function() {
    return this._password;
  });

UserSchema.statics = {};

UserSchema.methods = {
  comparePassword(candidatePassword, cb) {
    return bcrypt.compare(candidatePassword, this.hashedPassword, (err, isMatch) => {
      if (err) {
        console.error('Error attempting to compare passwords, err: ', err);
        return err;
      }

      cb(null, isMatch);
    });
  },

  encryptPassword(password) {
    if (!password || !this.salt) {
      console.error('Error, check to see there is a password or salt is being set.');
      return '';
    }

    return bcrypt.hashSync(this._password, this.salt);
  },

  makeSalt() {
    return bcrypt.genSalt(SALT_WORK_FACTOR);
  }
};

UserSchema.plugin(uniqueValidator);

let connection = mongoose.createConnection('mongodb://Brandons-MacBook-Pro.local:27017/satactprep');

export default connection.model('User', UserSchema);

