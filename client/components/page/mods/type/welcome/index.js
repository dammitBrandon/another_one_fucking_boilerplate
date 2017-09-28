import { Link } from 'react-router';
import Page from 'client/components/page';
import LangSwitcher from 'client/components/lang-switcher';
import styles from './styles.css';
import i18n from './i18n';

export default class PageTypeWelcome extends Page {
  /**
   * @override
   */
  render() {
    let t = this.t;
    let stls = this.styles;

    return (
      <div className={stls.page}>
        <LangSwitcher className={stls.langSwitcher} />
        <div className={stls.image}></div>
        <h1>This is the welcome</h1>
        <h1>{t('boilerplate')}</h1>
        <p>{t('another_one')}</p>
        <Link to="/examples/todos">{t('todo_list_example')}</Link>
        <br />
        <Link to="/landing">{t('landing_example')}</Link>
        <br />
        <Link to="/new-landing">{t('new_landing_example')}</Link>
        <br />
        <Link to="/registration">{t('registration')}</Link>

      </div>
    );
  }
}

PageTypeWelcome.i18n = i18n;
PageTypeWelcome.styles = styles;
