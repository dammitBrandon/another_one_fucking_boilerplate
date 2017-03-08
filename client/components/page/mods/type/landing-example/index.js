import Page from 'client/components/page';
import Loader from 'client/components/loader';
import i18n from './i18n';

export default class PageTypeLandingExample extends Page {
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
        <h1>{t('welcome')}</h1>
        <Loader isLoading={state.isLoading} />
      </div>
    );
  }
}

PageTypeLandingExample.i18n = i18n;
