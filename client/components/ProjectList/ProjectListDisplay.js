import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectProjectListByKeywords } from './selectors';
import states from '../../shared/constants/states';

import { ListRow, CircleDecoration } from '../UI/ListComponents';

const handleChangeProject = (e, handleChangeProjectFn, projectId) => {
  e.preventDefault();
  handleChangeProjectFn(projectId);
};

const ProjectListDisplayComponent = ({ projectList, changeProject }) => {
  return (
    <div>
      <ul>
        {projectList.map(project => {
          return (
            <ListRow key={project.id} click={(e) => { handleChangeProject(e, changeProject, project.id); }}>
              <CircleDecoration circle={states.getDescription(project.state)} >
                <h4>{project.name}</h4>
              </CircleDecoration>
            </ListRow>
          );
        })}
      </ul>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    projectList: selectProjectListByKeywords(state)
  };
}

ProjectListDisplayComponent.propTypes = {
  projectList: PropTypes.object.isRequired,
  changeProject: PropTypes.func.isRequired
};

export const ProjectListDisplay = connect(mapStateToProps)(ProjectListDisplayComponent);
