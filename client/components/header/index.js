import Component from 'lib/component';

export default class Header extends Component {

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
              <li className="menu-text">SAT.ACT Right Daily</li>
            </ul>
          </div>
          <div className="top-bar-right">
            <ul className="dropdown menu">
              <li><a href="#">Log In</a></li>
              <li><a href="#">Join Now</a></li>
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
