import Page from 'client/components/page';
import Loader from 'client/components/loader';
import Header from 'client/components/header';
import Input from 'client/components/input';
import deepPick from 'client/utils/utils';
import Model from './model';
import i18n from './i18n';

export default class PageTypeRegistration extends Page {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      form: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address1: '',
        address2: '',
        password: '',
        confirmPassword: '',
        emailAddress: '',
        country: '',
        zipCode: '',
        creditCard: {
          securityCode: '',
          cardNumber: '',
          expirationDate: '',
          nameOnCard: ''
        }
      }
    };
  }

  _handleInputChange(key, e) {
    console.log('PageTypeLogin#_handleInputChange e: ', e.target.value);
    console.log('this.state: ', this.state);
    // form.creditCard.expirationDate =>
    deepPick(this.state, key, e.target.value);
    console.log('new this.state: ', this.state);
    this.model.syncInputText(e.target.value, key);
  }

  _handleClick(e) {
    console.log('PageTypeRegistration#_handleClick e: ', e.target.value);
    this.model.registerUser(this.state);
    console.log('PageTypeRegistration#_handleClick');
  }

  render() {
    let state = this.state;

    return (
      <div>
        <Header />
        <div className="grid-container fluid">
          <div className="grid-x grid-padding-x">
            <div className="medium-6 cell">
              <label>
                <Input
                  value={state.form.firstName}
                  placeholder={'First Name'}
                  onChange={this._handleInputChange.bind(this, 'form.firstName')}
                />
              </label>
            </div>
            <div className="medium-6 cell">
              <label>
                <Input
                  value={state.form.lastName}
                  placeholder={'Last Name'}
                  onChange={this._handleInputChange.bind(this, 'form.lastName')}
                />
              </label>
            </div>
          </div>
          <div className="grid-x grid-padding-x">
            <div className="medium-6 cell">
              <label>
                <Input
                  value={state.form.phoneNumber}
                  placeholder={'Phone Number'}
                  onChange={this._handleInputChange.bind(this, 'form.phoneNumber')}
                />
              </label>
            </div>
          </div>
          <div className="grid-x grid-padding-x">
            <div className="medium-6 cell">
              <label>
                <Input
                  value={state.form.emailAddress}
                  placeholder={'Email Address'}
                  onChnage={this._handleInputChange.bind(this, 'form.emailAddress')}
                />
              </label>
            </div>
          </div>
          <div className="grid-x grid-padding-x">
            <div className="medium-6 cell">
              <label>
                <Input
                  value={state.form.password}
                  placeholder={'Password'}
                  onChnage={this._handleInputChange.bind(this, 'form.password')}
                />
              </label>
            </div>
            <div className="medium-6 cell">
              <label>
                <Input
                  value={state.form.confirmPassword}
                  placeholder={'Confirm Password'}
                  onChnage={this._handleInputChange.bind(this, 'form.confirmPassword')}
                />
              </label>
            </div>
          </div>
          <div className="grid-x grid-padding-x">
            <div className="medium-3 cell">
              <label>
                <Input
                  value={state.form.creditCard.securityCode}
                  placeholder={'Security Code'}
                  onChange={this._handleInputChange.bind(this, 'form.creditCard.securityCode')}
                />
              </label>
            </div>
            <div className="medium-3 cell">
              <label>
                <Input
                  value={state.form.creditCard.expirationDate}
                  placeholder={'Expiration Date'}
                  onChange={this._handleInputChange.bind(this, 'form.creditCard.expirationDate')}
                />
              </label>
            </div>
          </div>
          <div className="grid-x grid-padding-x">
            <div className="medium-3 cell">
              <label>
                <Input
                  value={state.form.creditCard.nameOnCard}
                  placeholder={'Name on Card'}
                  onChange={this._handleInputChange.bind(this, 'form.creditCard.nameOnCard')}
                />
              </label>
            </div>
          </div>
          <div className="grid-x grid-padding-x">
            <div className="medium-12 cell">
              <label>
                <Input
                  value={state.form.address1}
                  placeholder={'Address 1'}
                  onChange={this._handleInputChange.bind(this, 'form.address1')}
                />
              </label>
            </div>
            <div className="medium-12 cell">
              <label>
                <Input
                  value={state.form.address2}
                  placeholder={'Address 2'}
                  onChange={this._handleInputChange.bind(this, 'form.address2')}
                />
              </label>
            </div>
            <div className="medium-3 cell">
              <label>
                <Input
                  value={state.form.country}
                  placeholder={'Country'}
                  onChange={this._handleInputChange.bind(this, 'form.country')}
                />
              </label>
            </div>
            <div className="medium-3 cell">
              <label>
                <Input
                  value={state.form.zipCode}
                  placeholder={'Zip Code'}
                  onChange={this._handleInputChange.bind(this, 'form.zipCode')}
                />
              </label>
            </div>
          </div>
          <div className="medium-6 cell">
            <button type="button" className="button" onClick={this._handleClick.bind(this)}>Submit</button>
          </div>
        </div>
        <Loader isLoading={state.isLoading} />
      </div>
    );
  }
}

PageTypeRegistration.i18n = i18n;
PageTypeRegistration.Model = Model;
