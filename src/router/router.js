import React from 'react';
import { Route, Redirect, IndexRoute } from 'react-router';
import App from '../ui/pages/App';
import privateRoute from './private.route';

if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}
if (process.env.NODE_ENV !== 'production') {
  // Require async routes only in development for react-hot-reloader to work.
  require('../ui/pages/HomePage');
  require('../ui/pages/LoginPage');
  require('../ui/pages/administration/GatewayPage');
  require('../ui/pages/administration/LogsPage');
  require('../ui/pages/administration/HealthPage');
  require('../ui/pages/administration/MetricsPage');
  require('../ui/pages/administration/UserManagementPage');
  require('../ui/pages/administration/ConfigurationPage');
  require('../ui/pages/administration/AuditsPage');
  require('../ui/pages/administration/ApiDocsPage');

}

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (onLogout) => {
  return (
    <Route path="/" component={App}>
      <IndexRoute
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('../ui/pages/HomePage').default);
          });
        }}
      />
      <Route
        path="/admin/gateway"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, privateRoute(require('../ui/pages/administration/GatewayPage').default));
          });
        }}
      />
      <Route
        path="/admin/logs"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, privateRoute(require('../ui/pages/administration/LogsPage').default));
          });
        }}
      />
      <Route
        path="/admin/health"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, privateRoute(require('../ui/pages/administration/HealthPage').default));
          });
        }}
      />
      <Route
        path="/admin/metrics"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, privateRoute(require('../ui/pages/administration/MetricsPage').default));
          });
        }}
      />
      <Route
        path="/admin/user-management"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, privateRoute(require('../ui/pages/administration/UserManagementPage').default));
          });
        }}
      />
      <Route
        path="/admin/configuration"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, privateRoute(require('../ui/pages/administration/ConfigurationPage').default));
          });
        }}
      />
      <Route
        path="/admin/audits"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, privateRoute(require('../ui/pages/administration/AuditsPage').default));
          });
        }}
      />
      <Route
        path="/admin/docs"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, privateRoute(require('../ui/pages/administration/ApiDocsPage').default));
          });
        }}
      />
      <Route
        path="/login"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('../ui/pages/LoginPage').default);
          });
        }}
      />
      <Route
        path="/logout"
        onEnter={onLogout}
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('../ui/pages/LoginPage').default);
          });
        }}
      />
      />
    </Route>
  );
};
