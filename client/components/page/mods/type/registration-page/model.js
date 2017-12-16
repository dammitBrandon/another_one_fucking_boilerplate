import API from 'lib/api';
import Model from 'lib/component-model';
import EVENTS from 'lib/events';

const GATE = '/api/components/Login';

export default class RegistrationPageModel extends Model {
  constructor(view) {
    super(view);

    this
      .on(EVENTS.Register, this._handleRegisterUser);
  }

  _handleRegisterUser({ registrationForm }) {
    let query = { registrationForm };

    return API.create(`${GATE}/register`, query)
      .then(data => {
        console.log('successfully registered user, data: ', data);
        window.location.href = 'http://localhost:3000/profile';
      })
      .catch(err => {
        console.error('something went so wrong here, fuck: ', err);
        window.location.href = 'http://localhost:3000/';
      });
  }

  registerUser(registrationForm) {
    this.emit(EVENTS.Register, { registrationForm });
  }

  syncInputText(text, key) {
    this.setState(Object.assign({}, { [key]: text }));
  }
}
