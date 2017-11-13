import API from 'lib/api';
import Model from 'lib/component-model';
import EVENTS from 'lib/events';

const GATE = '/api/components/Login';

export default class LoginPageModel extends Model {
  constructor(view) {
    super(view);

    this
      .on(EVENTS.Logout, this._handleLogout)
      .on(EVENTS.Login, this._handleLogin);
  }

  _handleLogin({ email, password }) {
    let query = { email, password };

    return API.create(`${GATE}/login`, query)
      .then(data => console.log(data));
  }

  _handleLogout() {
    console.log('_handleLogout clicked');
    return API.remove(`${GATE}/logout`, {})
      .then(
        data => console.log('sucessfully logged out', data),
        err => console.error('something went wrong here: ', err)
      );
  }

  login(email, password) {
    this.emit(EVENTS.Login, { email, password });
  }

  logout() {
    console.log('model logout called, emitting logout event');
    this.emit(EVENTS.Logout, {});
  }

  syncInputText(text, key) {
    this.setState({ [key]: text });
  }
}
