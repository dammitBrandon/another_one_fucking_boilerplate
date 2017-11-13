import Component from 'lib/component';
import { Link } from 'react-router';
import Model from './model';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  _logout() {
    console.log('Header#_logout...');
    this.model.logout();
  }

  render() {
    return (
      <div>
        <div className="title-bar" data-responsive-toggle="responsive-menu" data-hide-for="medium">
          <button className="menu-icon" type="button" data-toggle="responsive-menu"></button>
          <div className="title-bar-title">Menu</div>
        </div>

        <div className="top-bar" id="responsive-menu">
          <div className="top-bar-left">
            <ul className="dropdown menu" data-dropdown-menu="true">
              <li className="menu-text"><Link to="/new-landing">SAT.ACT Right Daily</Link></li>
            </ul>
          </div>
          <div className="top-bar-right">
            <ul className="dropdown menu">
              <li><Link to="/login">Log In</Link></li>
              <li><a onClick={this._logout.bind(this)}>Log Out</a></li>
              <li><Link to="/registration">Register</Link></li>
              <li><a href="#">Profile</a></li>
              <li><a href="#">link 1</a></li>
              <li><a href="#">link 2</a></li>
              <li><input type="search" placeholder="Search" /></li>
              <li><button type="button" className="button">Search</button></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

Header.Model = Model;
