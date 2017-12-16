import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { HorizontalTab, TabItem } from '../../UI/Tab';

import { subLayoutContainer, menuItemLink, menuItemDefault, menuItemActive } from '../sharedStyles';

export const MasterLayout = ({ children, location: { pathname } }) => {
  const isMyProjectTabActive = /projects?$/.test(pathname);
  // const isMyPartiesTabActive = /parties?$/.test(pathname);

  return (
    <div>
      <HorizontalTab className={subLayoutContainer} height={'3rem'}>
        <TabItem className={menuItemDefault} activeClassName={menuItemActive} active={isMyProjectTabActive}>
          <Link className={menuItemLink} to={`${ROUTE_BASE}/projects`}>MY PROJECT</Link>
        </TabItem>
        {/* <TabItem className={menuItemDefault} activeClassName={menuItemActive} active={isMyPartiesTabActive}>
          <Link className={menuItemLink} to={`${ROUTE_BASE}/parties`}>MY PARTIES</Link>
        </TabItem> */}
      </HorizontalTab>
      {children}
    </div>
  );
};

MasterLayout.propTypes = {
  children: PropTypes.object.isRequired,
  location: PropTypes.object
};
