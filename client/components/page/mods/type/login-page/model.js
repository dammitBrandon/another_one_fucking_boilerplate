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

    return API.create(`${GATE}/login`, query)
      .then(data => console.log(data));
  }

  login(email, password) {
    this.emit(EVENTS.Login, { email, password });
  }

  syncInputText(text, key) {
    this.setState({ [key]: text });
  }
}
