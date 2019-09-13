import React, { Component } from 'react';
import './main.scss';
import { NavLink } from 'react-router-dom';

class EmployeeListing extends Component {
  props: {
  };

  static defaultProps = {
    employees: [
      {
        name: 'Employee 1',
        id: '1'
      },
      {
        name: 'Employee 2',
        id: '2'
      }
    ]
  };

  render() {
    const { employees } = this.props;
    return (
      <div className="project-listing">
        {
          employees.map((item) => {
            return (
              <div class="listing">
                <NavLink to={`/emp-detail/${item.id}`}>
                  <div class="project-id">{item.id}</div>
                  <div class="project-name">{item.name}</div>
                </NavLink>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default EmployeeListing;

