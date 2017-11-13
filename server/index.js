import 'babel-polyfill';
import fs from 'fs';
import path from 'path';
import express from 'express';
import session from 'express-session';
import ReactDOM from 'react-dom/server';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import createRedisStore from 'connect-redis';
import { match, RouterContext } from 'react-router';
import Html from 'client/components/html';
import routes from 'client/routes';
import I18N from 'lib/i18n';
import config from 'config';
import API from './api';
import providers from './providers';
import mongoose from 'mongoose';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from 'server/models/user';
const PORT = config.port;
const LANGS = config.langs;
const ASSETS = JSON.parse(fs.readFileSync(path.join(__dirname, 'assets.json'), 'utf8'));

// Configure mongoose and connect to MongoDB
mongoose.Promise = global.Promise;

let server = express();
let mongoConnection;

if (config.env === 'development') {
  server.use(express.static(path.join(__dirname, 'public')));
}

server.use(cookieParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use((req, res, next) => {
  let langFromQuery = req.query.lang;
  let langFromCookies = req.cookies.lang;
  let langFromAccepts = req.acceptsLanguages(LANGS);
  let lang;

  if (langFromQuery && LANGS.includes(langFromQuery)) {
    lang = langFromQuery;
  } else if (langFromCookies && LANGS.includes(langFromCookies)) {
    lang = langFromCookies;
  } else if (langFromAccepts && LANGS.includes(langFromAccepts)) {
    lang = langFromAccepts;
  } else {
    lang = LANGS[0];
  }

  req.lang = lang;
  I18N.setLang(lang);
  res.cookie('lang', lang, { maxAge: 1000 * 60 * 60 * 24 * 365 * 100 });

  next();
});

server.use(session(Object.assign({}, config.session, {
  store: new (createRedisStore(session))(config.redis),
  secret: config.session.secret,
  resave: false,
  saveUninitialized: false
})));

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

// Configure passport and define user local strategy
server.use(passport.initialize());
server.use(passport.session());
passport.use('local-login', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },

  (req, email, password, done) => {
    console.log('inside local-login');

    User.findOne({ email }, (err, user) => {
      if (!user) {
        console.log('User email not found!, user: ', user);
        return done(null, false);
      }

      console.log('using local-login strategy to authenticate user...');
      user.comparePassword(password, (err, isMatch) => {
        if (!isMatch) {
          console.log('User found, invalid password');
          return done(null, false);
        }

        console.log('Calling req.logIn...');
        req.logIn(user, err => {
          if (err) {
            console.error('Error, Failed to login user successfully using local-login strategy, err: ', err);
            return done(null, err);
          }

          console.log('User has been found, user: ', user);
          console.log('req.user: ', req.user);
          return done(null, user);
        });
      });
    });
  }));

passport.use('local-register', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  (req, email, password, done) => {
    console.log('inside local-register');

    User.findOne({ email }, (err, user) => {
      if (!user) {
        console.log('User email not found!, user: ', user);
        return done(null, false);
      }

      console.log('using local-register strategy to authenticate user...');
      user.comparePassword(password, (err, isMatch) => {
        if (isMatch) {
          console.log('User has been found, user: ', user);
          return done(null, user);
        }
        console.log('User found, invalid password');
        return done(null, false);
      });
    });
  }));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

server.use('/api', API);

server.use((req, res) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      let lang = req.lang;
      let page = renderProps.components[1];
      let pageName = page.name;
      let provider = providers[pageName];
      let loadPage = function(data = {}) {
        res
          .status(200).send(
          '<!doctype html>' +
          ReactDOM.renderToStaticMarkup(<Html
            lang={lang}
            data={data}
            body={ReactDOM.renderToString(<RouterContext {...renderProps} />)}
            bundle={ASSETS[lang]}
            pageName={pageName}
          />));
      };

      req.query = renderProps.location.query;
      req.params = renderProps.params;
      req.pageName = pageName;

      provider ?
        provider(req).then(data => {
          let pageData = data[pageName];
          let initialDefaultProps = page.defaultProps;

          page.defaultProps = Object.assign({}, initialDefaultProps, pageData);
          loadPage(pageData);
          page.defaultProps = initialDefaultProps;
        }) : loadPage();
    }
  });
});

server.listen(PORT, () => {
  console.log('The server is running at port ' + PORT); // eslint-disable-line no-console
});
