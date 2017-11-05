import mongoose from 'mongoose';
import mockUserData from 'server/testData/mockUserData.json';

export default function seedDB() {
  let User = mongoose.model('User');

  console.log('Seeding DB with mock users...');
  User.remove({}, function() {
    User.create(mockUserData, function() {
      User.find().exec(function(err, docs) {
        console.log(`There are ${docs.length} mock users in DB`);
      });
    });
  });
}
