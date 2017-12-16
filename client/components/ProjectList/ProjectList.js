import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ProjectListDisplay } from './ProjectListDisplay';
import { FunctionBar } from '../../shared/components';
import { LoadingPage } from '../LoadingPage/';

import { loadProjectListAct, changeProjectAct, changeProjectListSearchKeywordsAct } from './actions';
import { Icon } from '../UI/Icon';

import local from './ProjectList.scss';

class ProjectListComponent extends Component {
  state = {
    showLoadingPage: true
  }

  componentDidMount() {
    this.props.loadProjectList();
  }

  componentDidMount() {
    this.props.loadProjectList();
    setTimeout(() => {
      this.setState({ showLoadingPage: false });
    }, 800);
  }

  handleChangeProject = (projectId) => {
    this.props.changeProject(projectId);
  }

  render() {
    if (this.state.showLoadingPage || this.props.isProjectListLoading) {
      return <LoadingPage />;
    }
    return (
      <div className={local.container}>
        <div className={local.header}>
          <span>My Projecs</span>
          <div className={'pull-right'}>
            <div className={local.search}>
              <FunctionBar
                handleChangeKeywords={this.props.changeProjectListSearchKeywords}
                searchKeywords={this.props.projectListSearchKeywords}
                placeholder={'Search'}
              />
              <Icon icon={'search'} />
            </div>
          </div>
        </div>
        <div>
          <ProjectListDisplay changeProject={this.handleChangeProject} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isProjectListLoading: state.projectList.isLoading,
    projectListSearchKeywords: state.projectListSearchKeywords
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadProjectList: () => dispatch(loadProjectListAct()),
    changeProject: projectId => dispatch(changeProjectAct(projectId)),
    changeProjectListSearchKeywords: keywords => dispatch(changeProjectListSearchKeywordsAct(keywords))
  };
}

ProjectListComponent.propTypes = {
  loadProjectList: PropTypes.func.isRequired,
  isProjectListLoading: PropTypes.bool.isRequired,
  changeProject: PropTypes.func.isRequired,
  projectListSearchKeywords: PropTypes.string.isRequired,
  changeProjectListSearchKeywords: PropTypes.func.isRequired
};

export const ProjectList = connect(mapStateToProps, mapDispatchToProps)(ProjectListComponent);
