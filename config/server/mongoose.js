import config from 'config';

export default (server, mongoose) => {
  // Configure mongoose and connect to MongoDB
  mongoose.Promise = global.Promise;

  let mongoConnection;

  server.use((req, res, next) => {
    if (!mongoConnection) {
      mongoConnection = mongoose.connect(config.mongodb, { useMongoClient: true, keepAlive: 1 });
    }

    mongoConnection
      .then(db => {
        req.db = db;
        next();
      })
      .catch(err => {
        mongoConnection = null;
        next(err);
      });
  });
};
