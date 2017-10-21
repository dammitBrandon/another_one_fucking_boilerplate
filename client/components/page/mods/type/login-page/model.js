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
    console.log('handeLogin email: ', email);
    console.log('handeLogin password: ', password);

    let query = { email, password };

    return API.get(`${GATE}/login`, query)
      .then(data => console.log(data));
  }

  login(email, password) {
    console.log('LoginPageModel#login ', [...arguments]);
    this.emit(EVENTS.Login, { email, password });
  }

  syncInputText(text, key) {
    console.log('syncInputText: ', [...arguments]);
    this.setState({ [key]: text });
  }
}
