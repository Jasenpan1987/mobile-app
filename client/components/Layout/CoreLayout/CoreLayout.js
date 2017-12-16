import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadProjectAct } from '../../Dashboard/actions';

import { NotificationSystem } from '../../UI/NotificationSystem';

class CoreLayoutComponent extends Component {
  componentDidMount() {
    const { params: { projectId }, loadProject } = this.props;
    loadProject(projectId);
  }

  render() {
    const { children, notifications } = this.props;
    return (
      <div>
        { children }
        <NotificationSystem notifications={notifications} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    notifications: state.notifications
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadProject: projectId => dispatch(loadProjectAct(projectId))
  };
}

CoreLayoutComponent.propTypes = {
  children: PropTypes.object.isRequired,
  notifications: PropTypes.array,
  loadProject: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired
};

export const CoreLayout = connect(mapStateToProps, mapDispatchToProps)(CoreLayoutComponent);
