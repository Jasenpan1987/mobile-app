import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { TextFieldGroup } from '../UI/FormComponents';
import { Image } from '../UI/Image';
import { VerticalAlignment } from '../UI/AlignmentComponents';
import { CLS_FORM_BUTTON_WARNING_HIGHTLIGHT_FILL } from '../../shared/styles';
import localStyles from './styles.scss';
import globalStyles from '../../shared/styles/global.scss';

import { loginAct } from './actions';

class LoginComponent extends Component {
  state = {
    username: '',
    password: ''
  }

  setUsername = (username) => {
    this.setState({ username });
  }

  setPassword = (password) => {
    this.setState({ password });
  }

  render() {
    const containerCls = classnames(localStyles.container, 'theme-background-image', 'theme-color-invert');
    return (
      <div className={containerCls}>
        <VerticalAlignment alignment={'middle'} className={localStyles.body}>
          <div className={localStyles.logo}>
            <Image src={'logo-login.png'} />
          </div>

          <div className={localStyles.title}>
            <h2>Sign into PlanIT</h2>
          </div>

          <div className={localStyles['login-content']}>
            <p>SIGN IN WITH EMAIL</p>
            <div className={globalStyles['form-group']}>
              <TextFieldGroup floatingLabelText={'Username'} iconName={'user'} inputType={'text'} onChange={this.setUsername} />
            </div>
            <div className={globalStyles['form-group']}>
              <TextFieldGroup floatingLabelText={'Password'} iconName={'lock'} inputType={'password'} onChange={this.setPassword} />
            </div>
            <div className={classnames(globalStyles['form-group'], localStyles.sign)}>
              <button className={CLS_FORM_BUTTON_WARNING_HIGHTLIGHT_FILL} onClick={() => { this.props.login(this.state.username, this.state.password); }}>Sign in</button>
            </div>
          </div>
          <div className={'theme-branding-logo'}></div>
        </VerticalAlignment>
      </div>
    );
  }
}

LoginComponent.propTypes = {
  login: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    login: (username, password) => dispatch(loginAct(username, password))
  };
}

export const Login = connect(null, mapDispatchToProps)(LoginComponent);
