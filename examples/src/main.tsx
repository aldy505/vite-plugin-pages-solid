import { render } from 'solid-js/web';
import { Router, useRoutes } from 'solid-app-router';
import routes from 'virtual:generated-pages-solid';

const Routes = useRoutes(routes);
render(
  () => (
    <Router>
      <h1>This is a text from main</h1>
      <Routes />
    </Router>
  ),
  document.getElementById('app'),
);
