import Page from 'client/components/page';
import Loader from 'client/components/loader';
import Header from 'client/components/header';
import i18n from './i18n';

export default class PageTypeNewLanding extends Page {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  render() {
    let t = this.t;
    let state = this.state;

    return (
      <div>
        <Header />
        <div className="grid-container fluid">
          <div className="grid-x">
            <div className="medium-4 cell">
              <p>
                {t('join_txt')}
              </p>
              <br />
              <button type="button" className="button">{t('join_btn')}</button>
            </div>
            <div className="medium-4 cell">
              <p>
                {t('learn_more_txt')}
              </p>
              <br />
              <button type="button" className="success button">{t('learn_more_btn')}</button>
            </div>
            <div className="medium-4 cell">
              <p>
                {t('login_txt')}
              </p>
              <br />
              <button type="button" className="alert button">{t('login_btn')}</button>
            </div>
          </div>

        </div>
        <Loader isLoading={state.isLoading} />
      </div>
    );
  }
}

PageTypeNewLanding.i18n = i18n;
