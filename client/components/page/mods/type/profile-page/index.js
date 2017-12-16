import Page from 'client/components/page';
import Header from 'client/components/header';
import Model from './model';
import i18n from './i18n';

export default class PageTypeProfile extends Page {
  constructor(props) {
    super(props);
    this.state = {
      firstName: 'Brandon',
      lastName: 'Bailey',
      phoneNumber: '(301) 404-1730',
      email: 'bailey1.brandon@gmail.com',
      ccInfo: {
        cardNumber: 'XXXX XXXX XXXX 1234',
        expDate: '12/20'
      },
      billingAddress: {
        address1: '12000 Othman Court',
        address2: '',
        city: 'Fort Washington',
        state: 'MD',
        zipCode: '20744'
      }
    };
  }

  render() {
    const { firstName, lastName, billingAddress, ccInfo } = this.state;
    return (
      <div>
        <Header />
        <h2>Welcome { firstName }!</h2>
        <br/>
        <div>
          <h3>Account Info</h3>

          <p>
            <span>{ firstName } { lastName }</span>
            <br/>
            Billing Address:
            <br/>
            <span>{ billingAddress.address1 }</span>
            <br/>
            <span>{ billingAddress.city }</span>
            <br/>
            <span>{ billingAddress.state } { billingAddress.zipCode }</span>
            <br/>
            <br/>
            Credit Card Info:
            <br/>
            <span>{ ccInfo.cardNumber }</span>
            <br/>
            <span>{ ccInfo.expDate }</span>
          </p>
        </div>
      </div>
    );
  }
}

PageTypeProfile.i18n = i18n;
PageTypeProfile.Model = Model;
