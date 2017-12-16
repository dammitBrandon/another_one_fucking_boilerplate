import API from 'lib/api';
import Model from 'lib/component-model';
import EVENTS from 'lib/events';

const GATE = '/api/components/Login';
var handleRegisterUserCount = 0;

export default class RegistrationPageModel extends Model {
  constructor(view) {
    super(view);

    this
      .on(EVENTS.Register, this._handleRegisterUser);
  }

  _handleRegisterUser({ registrationForm }) {
    let query = { registrationForm };

    console.log('\n========================================================================================================================');
    console.log('_handleRegisterUser invoked...');
    console.log('handleRegisterUserCount: ', handleRegisterUserCount);

    return API.create(`${GATE}/register`, query)
      .then(data => {
        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
        console.log('user object data that we got back: ', data);
        console.log('about to go to the profile page...');
        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
        window.location.href = 'http://localhost:3000/profile';
      })
      .catch(err => {
        console.error('something went so wrong here, fuck: ', err);
        window.location.href = 'http://localhost:3000/';
      });
    console.log('_handleRegisterUser done...');
    console.log('========================================================================================================================\n\n\n');
  }

  registerUser(registrationForm) {
    this.emit(EVENTS.Register, { registrationForm });
  }

  syncInputText(text, key) {
    this.setState(Object.assign({}, { [key]: text }));
  }
}
