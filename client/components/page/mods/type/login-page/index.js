import Page from 'client/components/page';
import Loader from 'client/components/loader';
import Header from 'client/components/header';
import i18n from './i18n';

export default class PageTypeLogin extends Page {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
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
                <input type="text" placeholder="Email" />
              </label>
            </div>
            <div className="medium-6 cell">
              <label>
                <input type="text" placeholder="Password" />
              </label>
            </div>
          </div>
        </div>
        <Loader isLoading={state.isLoading} />
      </div>
    );
  }
}

PageTypeLogin.i18n = i18n;
