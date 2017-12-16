import { Route, IndexRoute } from 'react-router';
import PageType404 from './components/page/mods/type/404';
import PageTypeWelcome from './components/page/mods/type/welcome';
import PageTypeTodosExample from './components/page/mods/type/todos-example';
import PageTypeLandingExample from './components/page/mods/type/landing-example';
import PageTypeNewLanding from './components/page/mods/type/new-landing-page';
import PageTypeRegistration from './components/page/mods/type/registration-page';
import PageTypeLogin from './components/page/mods/type/login-page';
import PageTypeProfile from './components/page/mods/type/profile-page';

export default (
  <Route path="/">
    <IndexRoute component={PageTypeWelcome} />
    <Route path="examples/todos(/:state)" component={PageTypeTodosExample} />
    <Route path="landing" component={PageTypeLandingExample} />
    <Route path="new-landing" component={PageTypeNewLanding} />
    <Route path="registration" component={PageTypeRegistration} />
    <Route path="login" component={PageTypeLogin} />
    <Route path="profile" component={PageTypeProfile} />
    <Route path="*" component={PageType404} />
  </Route>
);
