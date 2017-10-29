import API from 'lib/api';
import Model from 'lib/component-model';
import EVENTS from 'lib/events';

const GATE = '/api/components/Register';

export default class RegistrationPageModel extends Model {
  constructor(view) {
    super(view);

    this
      .on(EVENTS.Register, this._handleRegisterUser);
  }

  _handleRegisterUser({ registrationForm }) {
    console.log('handleRegisterUser: ', registrationForm);
    let query = { registrationForm };

    return API.get(`${GATE}/register`, query)
      .then(data => console.log(data));
  }

  registerUser(registrationForm) {
    console.log('RegistrationPageModel#registerUser ', { registrationForm });
    this.emit(EVENTS.Register, { registrationForm });
  }

  syncInputText(text, key) {
    console.log('RegistrationPageModel#syncInputText: ', [...arguments]);
    this.setState(Object.assign({}, { [key]: text }));
  }
}
