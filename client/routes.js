import React from 'react';
import { Route, IndexRedirect } from 'react-router';

import { CoreLayout, MainLayout, ProjectLayout, MasterLayout, LotLayout } from './components/Layout';
import { ProjectList } from './components/ProjectList';
import { DashBoard } from './components/Dashboard';
import { LotList } from './components/LotList';
import { Login } from './components/Login';
import { LotDetail } from './components/LotDetail';
import { LoadingPage } from './components/LoadingPage';
import { NotFound } from './components/NotFound';

import { getUser } from './utils';
// import { Admin } from './shared/constants/roles';

function onEnterMainLayout(nextState, replace) {
  const user = getUser();
  if (!user.accessToken || !user.identity) {
    replace(`${ROUTE_BASE}/login`);
  }
}

// function onEnterMainLogin(nextState, replace) {
//   const user = getUser();

//   if (user.accessToken && user.identity) {
//     replace(`${API_BASE}/projects`);
//   }
// }

// function checkAdminRole(nextState, replace) {
//   if (!hasRole(Admin)) {
//     replace({
//       pathname: 'notAuthorized',
//       state: { nextPathname: nextState.location.pathname }
//     });
//   }
// }

// const PartyListView = () => (<h2>PartyListView</h2>);

// const Parties = () => (<h2>Parties</h2>);

// const NotAuthorizedView = () => (<h2>Not Authorized</h2>);

export default (
  <Route path={ROUTE_BASE || '/'} component={CoreLayout}>
    <IndexRedirect to={`${ROUTE_BASE}/projects`} />
    <Route component={MainLayout} onEnter={onEnterMainLayout}>
      <Route component={MasterLayout}>
        <Route path="projects" component={ProjectList} />
        {/* <Route path="parties" component={PartyListView} /> */}
      </Route>
      <Route path="projects/:projectId" component={ProjectLayout}>
        <IndexRedirect to="dashboard" />
        <Route path="dashboard" component={DashBoard} />
        <Route path="lots" component={LotList} />
        {/* <Route path="parties" component={Parties} /> */}
        <Route path="lots/:lotId" component={LotLayout}>
          <IndexRedirect to="primary" />
          <Route path="primary" component={LotDetail} />
        </Route>
      </Route>
    </Route>
    <Route path="loading" component={LoadingPage} />
    <Route path="login" component={Login} />
    {/* <Route path="notAuthorized" component={NotAuthorizedView} /> */}
    <Route path="*" component={NotFound} />
  </Route>
);
