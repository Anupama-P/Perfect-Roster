import React, { Component } from 'react';
import './main.scss';
import { NavLink } from 'react-router-dom';

class ProjectListing extends Component {
  props: {
  };

  static defaultProps = {
    projects: [
      {
        name: 'Project 1',
        pid: '1'
      },
      {
        name: 'Project 2',
        pid: '2'
      }
    ]
  };

  render() {
    const { projects } = this.props;
    return (
      <div className="project-listing">
        {
          projects.map((item) => {
            return (
              <div class="listing">
                <NavLink to={`/project-detail/${item.pid}`}>
                  <div class="project-id">{item.pid}</div>
                  <div class="project-name">{item.name}</div>
                </NavLink>
              </div>
            );
          })
        }
        <div class="button-div">
          <NavLink class="add-project-button btn-primary" to={'/project-detail/'}>Add Project</NavLink>
        </div>
      </div>
    );
  }
}

export default ProjectListing;

