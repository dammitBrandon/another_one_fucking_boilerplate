import 'babel-polyfill';
import 'whatwg-fetch';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';

function createElement(Component, props) {
  if (INITIAL_DATA) {
    props = Object.assign({}, props, INITIAL_DATA);

    // Clear the initial data after returning the component
    setTimeout(() => {
      INITIAL_DATA = null;
      document.body.removeAttribute('data-initial');
    }, 0);
  }

  return <Component {...props}/>;
}

render(
  <Router history={browserHistory} createElement={createElement}>
    {routes}
  </Router>,
  document.getElementById('app'));
