import bcrypt from 'bcrypt-nodejs';
import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    index: true
  },
  password: String
});

UserSchema.statics = {
  comparePassword(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) { return cb(err); }
      cb(null, isMatch);
    });
  }
};

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

let connection = mongoose.createConnection('mongodb://Brandons-MacBook-Pro.local:27017/satactprep');

export default connection.model('User', UserSchema);
// export default mongoose.model('User', UserSchema);
