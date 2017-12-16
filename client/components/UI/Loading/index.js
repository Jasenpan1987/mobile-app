import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import local from './Loading.scss';

const LoadingComponent = ({ size, color }) => {
  const faSize = size === 'xsmall' ? 'fa-1x' :
    size === 'small' ? 'fa-2x' : 'fa-3x';

  const styleModifiers = { };

  if (color) styleModifiers.color = color;

  return (
    <i className={classnames('fa fa-spinner fa-spin fa-fw', faSize, local.icon)} style={{ ...styleModifiers }}></i>
  );
};

LoadingComponent.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string
};

export const Loading = LoadingComponent;
