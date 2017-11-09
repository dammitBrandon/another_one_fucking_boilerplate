export default {
  port: 3000,
  mongodb: 'mongodb://Brandons-MacBook-Pro.local:27017/satactprep',
  redis: {
    host: 'localhost',
    port: 6379
  },
  session: {
    name: 'sid',
    proxy: true,
    resave: false,
    secret: 'FuckThat',
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 },
    saveUninitialized: true
  }
};
