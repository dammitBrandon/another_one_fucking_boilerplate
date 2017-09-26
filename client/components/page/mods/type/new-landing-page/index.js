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
        <h1>{t('welcome')}</h1>
        <h1>This is the new landing example</h1>
        <Loader isLoading={state.isLoading} />
      </div>
    );
  }
}

PageTypeNewLanding.i18n = i18n;
