import React from 'react';
import PropTypes from 'prop-types';

const LandingLayoutComponent = ({ children }) => {
  return (
    <div>
      { children }
    </div>
  );
};

LandingLayoutComponent.propTypes = {
  children: PropTypes.object.isRequired
};


export const LandingLayout = LandingLayoutComponent;
