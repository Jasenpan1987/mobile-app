import React from 'react';
import PropTypes from 'prop-types';
import styles from './FunctionBar.scss';
import classnames from 'classnames';

const FunctionBarComponent = ({ searchKeywords, placeholder, handleChangeKeywords, className }) => {
  return (
    <div className={classnames(styles.container, className)}>
      <input
        type="text"
        value={searchKeywords}
        placeholder={placeholder}
        onChange={ (e) => handleChangeKeywords(e.target.value) }
      />
    </div>
  );
};

FunctionBarComponent.propTypes = {
  handleChangeKeywords: PropTypes.func.isRequired,
  searchKeywords: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.any
};

export const FunctionBar = FunctionBarComponent;
