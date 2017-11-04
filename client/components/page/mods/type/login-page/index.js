import Page from 'client/components/page';
import Loader from 'client/components/loader';
import Header from 'client/components/header';
import Input from 'client/components/input';
import Model from './model';
import i18n from './i18n';

export default class PageTypeLogin extends Page {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: '',
      password: ''
    };
  }

  _handleInputChange(key, e) {
    this.state[key] = e.target.value;
    this.model.syncInputText(e.target.value, key);
  }

  _handleClick() {
    this.model.login(this.state.email, this.state.password);
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
                  value={state.email}
                  placeholder={'Enter email here'}
                  onChange={this._handleInputChange.bind(this, 'email')}
                />
              </label>
            </div>
            <div className="medium-6 cell">
              <label>
                <Input
                  value={state.password}
                  placeholder={'Enter password here'}
                  onChange={this._handleInputChange.bind(this, 'password')}
                />
              </label>
            </div>
            <div className="medium-6 cell">
              <button type="button" className="button" onClick={this._handleClick.bind(this)}>Submit</button>
            </div>
          </div>
        </div>
        <Loader isLoading={state.isLoading} />
      </div>
    );
  }
}

PageTypeLogin.i18n = i18n;
PageTypeLogin.Model = Model;
