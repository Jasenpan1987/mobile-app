import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LandingLayoutComponent extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }
}

LandingLayoutComponent.propTypes = {
  children: PropTypes.object.isRequired
};

export const LandingLayout = LandingLayoutComponent;
