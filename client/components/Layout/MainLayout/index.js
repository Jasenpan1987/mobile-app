import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Image, Icon } from '../../UI';
import { Logout } from '../../Login';
import { getUser } from '../../../utils';
import { Link } from 'react-router';
import { mainLayoutContainer, menuItemLink } from '../sharedStyles';

import localStyles from './style.scss';
import globalStyles from '../../../shared/styles/global.scss';
import { CLS_BUTTON_SUCCESS } from '../../../shared/styles';
export class MainLayout extends Component {
  state = {
    showUserDetail: false
  }

  render() {
    const { children } = this.props;
    const logoConatainerCls = classnames(globalStyles['col-sm-offset-4'], globalStyles['col-sm-4'], globalStyles['col-xs-4'], localStyles.logo);

    return (
      <div>
        <div className={classnames(mainLayoutContainer, localStyles.title)}>
          <div className={logoConatainerCls}>
            <Link className={menuItemLink} to={`${ROUTE_BASE}/projects`}><Image src={'logo-login.png'} /></Link>
          </div>
          <div className={classnames(globalStyles['col-sm-4'], globalStyles['col-xs-8'])}>
            <div className={classnames('pull-right', localStyles.layoutRight)}>
              <button
                className={CLS_BUTTON_SUCCESS}
                onClick={() => { window.location.reload(); }}
              >
                Refresh
              </button>
              {/* <span>Search PlanIT</span>
              <Icon icon={'search'} /> */}
              <Icon icon={'user-circle-o'} className={localStyles['login-icon']} onClick={() => { this.setState({ showUserDetail: !this.state.showUserDetail }); }} />
            </div>
          </div>
          {this.state.showUserDetail && (
            <div
              className={localStyles.dropdown}
              onClick={() => { this.setState({ showUserDetail: false }); }}
            >
              <div className={localStyles['dropdown-content']}>
                <ul>
                  <li className={classnames(globalStyles['layout-main-dropdown-list-item'], 'theme-background-color-lighter', 'theme-border-top-darker')}>
                    <p>{getUser().identity.username}</p>
                  </li>
                  <li className={classnames(globalStyles['layout-main-dropdown-list-item'], 'theme-background-color-lighter', 'theme-border-top-darker')}>
                    <p><Logout /></p>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
        {children}
      </div>
    );
  }
}

MainLayout.propTypes = {
  children: PropTypes.object.isRequired
};
