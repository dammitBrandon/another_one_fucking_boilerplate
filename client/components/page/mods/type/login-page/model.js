import API from 'lib/api';
import Model from 'lib/component-model';
import EVENTS from 'lib/events';

const GATE = '/api/components/Login';

export default class LoginPageModel extends Model {
  constructor(view) {
    super(view);

    this
      .on(EVENTS.Login, this._handleLogin);
  }

  _handleLogin({ email, password }) {
    let query = { email, password };

    return API.create(`${GATE}/login-test`, query)
      .then(data => {
        console.log('attempted to login, data below');
        console.log(data);
        console.log('redirecting to the profile page');
        window.location.href = 'http://localhost:3000/profile';
      })
      .catch(err => {
        console.log('login attempt failed, see error: ', err);
        console.log('======================================');
        console.log('additional arguments: ', arguments);
        console.log('======================================');
        console.log('transitioning to / page');
        window.location.href = 'http://localhost:3000/';
      });
  }

  login(email, password) {
    this.emit(EVENTS.Login, { email, password });
  }

  syncInputText(text, key) {
    this.setState({ [key]: text });
  }
}
