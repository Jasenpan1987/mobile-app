import React from 'react';
import PropTypes from 'prop-types';

const LayoutComponent = (props) => {
  return (
    <div>
      <h3>Layout</h3>
      {props.children}
    </div>
  );
};

LayoutComponent.propTypes = {
  children: PropTypes.object.isRequired
};

export const Layout = LayoutComponent;
