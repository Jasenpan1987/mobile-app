import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router';

import classnames from 'classnames';
import localStyles from './ListRow.scss';

export const ListRow = ({ click, to, children, ...rest }) => {
  const angleCls = classnames(localStyles.angle, 'theme-color-outstanding');
  const contentCls = classnames(localStyles.content, 'theme-border-bottom-lightest');
  const linkCls = classnames(localStyles.link, 'theme-color-default');
  return (
    <li {...rest}>
        <Link className={linkCls} to={to}>
          <div className={contentCls} onClick={click}>
            <div>
              {children}
            </div>
            <div className={angleCls}>
              <i className={'fa fa-angle-right'} />
            </div>
          </div>
        </Link>
    </li>
  );
};

ListRow.propTypes = {
  click: PropTypes.func,
  to: PropTypes.string,
  children: PropTypes.any
};
