import React, { Component } from 'react';
import './main.scss';
import { NavLink } from 'react-router-dom';
import highchartsExporting from 'highcharts/modules/exporting';
import ReactHighcharts from 'react-highcharts';
import Highcharts from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more'
import ReactEcharts from 'echarts-for-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


highchartsExporting(Highcharts);

class ProjectDetail extends Component {
  props: {
    match: {
      params: {
        projectId: Number
      }
    },
  };

  static defaultProps = {
    project: {
      name: 'Project 1',
      pid: '1'
    },
    roleOptions: [
      {
        id: 12,
        name: 'role 1'
      },
      {
        id: 123,
        name: 'role 2'
      }
    ],
    employeeOptions: [
      {
        id: 1,
        name: 'Anupama'
      },
      {
        itId: 2,
        name: 'Roshan'
      }
    ],
    skillsList: [{
    id: 1,
    name: 'python'
    },
    {
        id: 2,
        name: 'pentaho'
    },
    {
        id: 3,
        name: 'React'
    },
    {
        id: 4,
        name: 'postgres'
    },
    {
        id: 5,
        name: 'etl_tools'
    },
    {
        id: 6,
        name: 'sql'
    },
    {
        id: 7,
        name: 'Data science'
    },
    {
        id: 8,
        name: 'Design'
    },
    ]
  };

  state= {
    project: {
      "pid": '',
      "name": "",
      "start_date": "",
      "end_date": "",
      "allocations": []
    },
    addMember: false,
    selectedskills: []
  }

  componentWillMount() {
    const project = {
      "pid": 123,
      "name": "project_name",
      "start_date": "",
      "end_date": "",
      "allocations": [
          {
              "employee": "employee_id_INT",
              "project_role": "role_id_INT",
              "from_date": "project_start_date",
              "to_date": "project_end_date",
              "percentage_allocation": "100"
          }
      ]
    }

    const skills = {
        "project": 123,
        "version_name": "Mandatory name",
        "is_default": "Boolean",
        "skills": {
            "1": {
                "id": 1,
                "name": "python",
                "value": 3,
                "parent_id": 6,
                "level": 1
            },
            "2": {
                "id": 2,
                "name": "pentaho",
                "value": 2,
                "parent_id": 6,
                "level": 1
            },
            "3": {
                "id": 3,
                "name": "React",
                "value": 1,
                "parent_id": 6,
                "level": 1
            },
            "4": {
                "id": 4,
                "name": "postgres",
                "value": 1,
                "parent_id": 6,
                "level": 1
            },
            "5": {
                "id": 5,
                "name": "etl_tools",
                "value": 1,
                "parent_id": 6,
                "level": 1
            },
        }
    }

    const skillsList = [{
    id: 1,
    name: 'python'
      },
      {
          id: 2,
          name: 'pentaho'
      },
      {
          id: 3,
          name: 'React'
      },
      {
          id: 4,
          name: 'postgres'
      },
      {
          id: 5,
          name: 'etl_tools'
      },
      {
          id: 6,
          name: 'sql'
      },
      {
          id: 7,
          name: 'Data science'
      },
      {
          id: 8,
          name: 'Design'
      },
      ]

    this.setState({ project, skills, skillsList });
  }

  handleChange = (e) => {
    const { project } = this.state;
    project['name'] = e.target.value;
    this.setState({
      project
    });
  }

  handleStartChange = (date) => {
    const { project } = this.state;
    project['start_date'] = date;
    this.setState({
      project
    });
  }

  handleEndChange = (date) => {
    const { project } = this.state;
    project['end_date'] = date;
    this.setState({
      project
    });
  }

  setButton = (key) => {
    this.setState({
      selected: key
    });
  }

  setAddMemberButton = () => {
    this.setState({
      addMember: true
    });
  }

  roleSelect = (e) => {
    this.setState({
      role: e.target.value
    });
  }

  addskillscore = (skill) => {
    const { skills, project } = this.state;
    const skills_project = skills['skills'];
    let updated = false;
    Object.keys(skills_project).map((item) => {
      console.log(item, skill.id);
      if (item == skill.id) {
        updated = true;
        skills_project[item]['value'] = skills_project[item]['value'] + 1;
        const parent_id = item['parent_id'];
        Object.keys(skills_project).map((parent_item) => {
          if (parent_item === parent_id) {
            skills_project[parent_item]['value'] = skills_project[parent_item]['value'] + 1;
          }
        });
      }
    });
    if (updated == false) {
        skills_project[skill.id] = {
          "id": skill.id,
          "name": skill.name,
          "value": 1,
          "parent_id": 1,
          "level": 1
        }
    }

    skills['skills'] = skills_project;
    this.setState({
      skills
    })
  }

  AddSkills = (key) => {
    const { selectedskills } = this.state;
    selectedskills.push(key);
    this.setState({selectedskills});

    this.addskillscore(key);
  }

  employeeSelect = (e) => {
    this.setState({
      employee: e.target.value
    });
  }

  submitSelect = () => {
    const { project, employee, role } = this.state;
    const new_allocations = {
      "employee": employee,
      "project_role": role,
      "from_date": "project_start_date",
      "to_date": "project_end_date",
      "percentage_allocation": "100"
    }
    project["allocations"].push(new_allocations);
    console.log(project);
    this.setState({ project });
  }

  saveProject = () => {
    //api send project
  }

  render() {
    const { project, selected, addMember, selectedskills, skills } = this.state;
    const { roleOptions, skillsList, employeeOptions } = this.props;

    const indicator = []
    const values = []
    Object.keys(skills['skills']).map((item) => {
      indicator.push({text: skills['skills'][item]['name'], max: 10});
      values.push(skills['skills'][item]['value'])
    })


    const option = {
        title: {
            text: 'Employee Details',
            top: 10,
            left: 10
        },
        tooltip: {
            trigger: 'item',
            backgroundColor : 'rgba(0,0,250,0.2)'
        },
        legend: {
            type: 'scroll',
            bottom: 10,
            data: (function (){
                var list = [];
                for (var i = 1; i <=12; i++) {
                    list.push(i + 2000 + '');
                }
                return list;
            })()
        },
        visualMap: {
            top: 'middle',
            right: 10,
            color: ['yellow'],
            calculable: false
        },
        radar: {
           indicator : indicator,
            triggerEvent: true
        },
        series : [{
          name: 'Skills',
          type: 'radar',
          // areaStyle: {normal: {}},
          data : [
              {
                  value : values,
                  name : 'skills'
              }
          ]
      }]
    };

    return (
      <div className="project-detail">
        <div className="first-div">
        <input
          onChange={(e) => this.handleChange(e)}
          defaultValue={project && project.name}
          value={project && project.name}
          className="project-name-input"
        />
        <div class='date'>
        Start date
        <DatePicker
          selected={project && project.start_date}
          onChange={this.handleStartChange}
        />
        End date
        <DatePicker
          selected={project && project.end_date}
          onChange={this.handleEndChange}
        />
        </div>
        <button class="btn-primary" onClick={() => this.setAddMemberButton('employee-select')}>Add Member</button>
        {addMember &&
          <div class="add-mem">
            <button class="btn-primary" onClick={() => this.setButton('employee-select')}>Select by employee name</button>
            <button class="btn-primary role-click" onClick={() => this.setButton('role-select')}>Select by Role</button>
            {
              selected === 'employee-select' &&
              <div class="select-by-role">
                <select id="employee" onChange={this.employeeSelect}  className="dropdown-style" value={this.state.employee}>
                  <option value="select">Select</option>;
                  {
                    employeeOptions.map((item) => {
                      return <option value={item.empId}>{item.name}</option>;
                    })
                  }
                 </select>
                 <button class="btn-primary" onClick={() => this.submitSelect()}>Add</button>
              </div>
            }
            {
              selected === 'role-select' &&
              <div class="select-by-role">
                <label className="select-role-label">Select a role</label>
                <select id="role" onChange={this.roleSelect} className="dropdown-style" value={this.state.role}>
                  <option value="select">Select</option>;
                  {
                    roleOptions.map((item) => {
                      return <option value={item.id}>{item.name}</option>;
                    })
                  }
                 </select>
                 {
                  skillsList.map((item) => {
                    return <button onClick={() => this.AddSkills(item)}>{item.name}</button>;
                  })
                 }
                 {
                  selectedskills && selectedskills.map((item) => {
                    return <p class='last-style'>{item.name}</p>;
                  })
                 }
                 <select id="employee" onChange={this.employeeSelect}  className="dropdown-style" value={this.state.employee}>
                  <option value="select">Select</option>;
                  {
                    employeeOptions.map((item) => {
                      return <option value={item.empId}>{item.name}</option>;
                    })
                  }
                 </select>
                 <button class="btn-primary" onClick={() => this.submitSelect()}>Add</button>
              </div>
            }
          </div>
        }
      <button class="btn-primary" onClick={() => this.saveProject()}>Submit</button>
      </div>
      <div class='first-div'>
        <ReactEcharts
          style={{height: '700px', width: '100%'}}
          option={option}
        />
      </div>
      </div>
    );
  }
}

export default ProjectDetail;

