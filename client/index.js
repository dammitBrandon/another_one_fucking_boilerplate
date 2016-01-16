import 'babel-polyfill';
import { render } from 'react-dom';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes from './routes';

function createElement(Component, props) {
  INITIAL_DATA && (props = Object.assign({}, props, INITIAL_DATA));

  // Clear the initial data after returning the component
  setTimeout(() => {
    INITIAL_DATA = null;
  }, 0);

  return <Component {...props}/>;
}

render(
  <Router history={createBrowserHistory()} createElement={createElement}>
    {routes}
  </Router>,
  document.getElementById('app'));