import Page from 'client/components/page';
import Loader from 'client/components/loader';
import Header from 'client/components/header';
import i18n from './i18n';

export default class PageTypeRegistration extends Page {
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
                <input type="text" placeholder="First Name" />
              </label>
            </div>
            <div className="medium-6 cell">
              <label>
                <input type="text" placeholder="Last Name" />
              </label>
            </div>
          </div>
          <div className="grid-x grid-padding-x">
            <div className="medium-6 cell">
              <label>
                <input type="number" placeholder="Phone Number"/>
              </label>
            </div>
          </div>
          <div className="grid-x grid-padding-x">
            <div className="medium-6 cell">
              <label>
                <input type="text" placeholder="Email Address"/>
              </label>
            </div>
          </div>
          <div className="grid-x grid-padding-x">
            <div className="medium-6 cell">
              <label>
                <input type="text" placeholder="Password" />
              </label>
            </div>
            <div className="medium-6 cell">
              <label>
                <input type="text" placeholder="Confirm Password" />
              </label>
            </div>
          </div>
          <div className="grid-x grid-padding-x">
            <div className="medium-3 cell">
              <label>
                <input type="number" placeholder="Security Code" />
              </label>
            </div>
            <div className="medium-3 cell">
              <label>
                <input type="number" placeholder="Exp(mm/yyyy)" />
              </label>
            </div>
          </div>
          <div className="grid-x grid-padding-x">
            <div className="medium-3 cell">
              <label>
                <input type="text" placeholder="Name on Card" />
              </label>
            </div>
          </div>
          <div className="grid-x grid-padding-x">
            <div className="medium-12 cell">
              <label>
                <input type="text" placeholder="Billing Address 1" />
              </label>
            </div>
            <div className="medium-12 cell">
              <label>
                <input type="text" placeholder="Billing Address 2" />
              </label>
            </div>
            <div className="medium-3 cell">
              <label>
                <input type="text" placeholder="Country" />
              </label>
            </div>
            <div className="medium-3 cell">
              <label>
                <input type="number" placeholder="Zip Code" />
              </label>
            </div>
          </div>
        </div>
        <Loader isLoading={state.isLoading} />
      </div>
    );
  }
}

PageTypeRegistration.i18n = i18n;
