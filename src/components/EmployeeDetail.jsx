import React, { Component } from 'react';
import './main.scss';
import { NavLink } from 'react-router-dom';
import ReactEcharts from 'echarts-for-react';

// render echarts option.

class EmployeeDetail extends Component {
  props: {
    match: {
      params: {
        empId: Number
      }
    },
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

  onChartClick = () => {
    //get new data
  }

  render() {
    const { projects } = this.props;
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
                for (var i = 1; i <=28; i++) {
                    list.push('Week ' + i);
                }
                return list;
            })()
        },
        visualMap: {
            top: 'middle',
            right: 10,
            color: ['blue', 'yellow'],
            calculable: true
        },
        radar: {
           indicator : [
               { text: 'Python', max: 400},
               { text: 'React', max: 400},
               { text: 'Postgres', max: 400},
               { text: 'Etl Tools', max: 400},
               { text: 'SQL', max: 400}
            ],
            triggerEvent: true
        },
        series : (function (){
            var series = [];
            for (var i = 1; i <= 28; i++) {
                series.push({
                    name:'',
                    type: 'radar',
                    symbol: 'none',
                    lineStyle: {
                        width: 1
                    },
                    emphasis: {
                        areaStyle: {
                            color: 'rgba(0,250,0,0.3)'
                        }
                    },
                    data:[
                      {
                        value:[
                            (40 - i) * 10,
                            (38 - i) * 4 + 60,
                            i * 5 + 10,
                            i * 9,
                            i * i /2
                        ],
                        name: 'week ' + i
                      }
                    ]
                });
            }
            return series;
        })()
    };

    const onEvents = {
      'click': this.onChartClick,
    }
    return (
      <ReactEcharts
        style={{height: '700px', width: '100%'}}
        option={option}
        onEvents={onEvents}
      />
    );
  }
}

export default EmployeeDetail;

