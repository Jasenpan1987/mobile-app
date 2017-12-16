import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { HorizontalTab, TabItem } from '../../UI/Tab';

import { subLayoutContainer, menuItemLink, menuItemDefault, menuItemActive } from '../sharedStyles';

export const ProjectLayout = ({ children, params: { projectId }, location: { pathname } }) => {
  const isDashboardTabActive = /projects\/\d+\/dashboard?$/.test(pathname);
  const isLotsTabActive = /projects\/\d+\/lots.*?$/.test(pathname);

  return (
    <div>
      <HorizontalTab className={subLayoutContainer} height={'3rem'}>
        <TabItem className={menuItemDefault} activeClassName={menuItemActive} active={isDashboardTabActive}>
          <Link className={menuItemLink} to={`${ROUTE_BASE}/projects/${projectId}/dashboard`}>DASHBOARD</Link>
        </TabItem>
        <TabItem className={menuItemDefault} activeClassName={menuItemActive} active={isLotsTabActive}>
          <Link className={menuItemLink} to={`${ROUTE_BASE}/projects/${projectId}/lots`}>LOTS</Link>
        </TabItem>
      </HorizontalTab>
      {children}
    </div>
  );
};

ProjectLayout.propTypes = {
  children: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};
