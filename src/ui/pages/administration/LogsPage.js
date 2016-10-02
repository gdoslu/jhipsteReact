import React, {Component} from 'react';
import {connect} from 'react-redux';

import Translate from 'react-translate-component';
import { getLoggers, changeLogLevel } from '../../../reducers/administration.reducer';

export class LogsPage extends Component {

  constructor(props){
    super(props);
    this.getLogs = this.getLogs.bind(this);
    this.changeLevel = this.changeLevel.bind(this);
  }

  componentDidMount() {
    this.props.getLoggers();
  }

  getLogs(){
    if (!this.props.isFetching) {
      this.props.getLoggers();
    }
  }

  changeLevel(loggerName, level) {
    this.props.changeLogLevel(loggerName, level);
  }

  render() {
    const { logs, isFetching } = this.props;
    const loggers = logs ? logs.loggers : {};
    return (

      <div className="well ng-scope" ui-view="content">
        <div className="table-responsive">
          <h2 translate="logs.title">Logs</h2>
          <p translate="logs.nbloggers" translate-values="{total: '{{ vm.loggers.length }}'}">There are { loggers.length } loggers.</p>

          <span translate="logs.filter">Filter</span>
          <input type="text" className="form-control" disabled={isFetching}/>

          <table className="table table-condensed table-striped table-bordered" >
            <thead>
            <tr title="click to order">
              <th ng-click="predicate = 'name'; reverse=!reverse"><span translate="logs.table.name">Name</span></th>
              <th ng-click="predicate = 'level'; reverse=!reverse"><span translate="logs.table.level">Level</span></th>
            </tr>
            </thead>
            <tbody>
            {
              loggers.map((logger, i) =>
                <tr>
                  <td><small>{logger.name}</small></td>
                  <td>
                    <button disabled={isFetching} onClick={() => this.changeLevel(logger.name, 'TRACE')} className={`btn btn-default btn-xs ${(logger.level=='TRACE') ? 'btn-danger' : 'btn-default'}`}>TRACE</button>
                    <button disabled={isFetching} onClick={() => this.changeLevel(logger.name, 'DEBUG')} className={`btn btn-default btn-xs ${(logger.level=='DEBUG') ? 'btn-warning' : 'btn-default'}`}>DEBUG</button>
                    <button disabled={isFetching} onClick={() => this.changeLevel(logger.name, 'INFO')} className={`btn btn-default btn-xs ${(logger.level=='INFO') ? 'btn-info' : 'btn-default'}`}>INFO</button>
                    <button disabled={isFetching} onClick={() => this.changeLevel(logger.name, 'WARN')} className={`btn btn-default btn-xs ${(logger.level=='WARN') ? 'btn-success' : 'btn-default'}`}>WARN</button>
                    <button disabled={isFetching} onClick={() => this.changeLevel(logger.name, 'ERROR')} className={`btn btn-default btn-xs ${(logger.level=='WARN') ? 'btn-primary' : 'btn-default'}`}>ERROR</button>
                  </td>
                </tr>
              )
            }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default connect(
  ({administration}) => ({logs: administration.logs, isFetching: administration.isFetching}),
  {getLoggers, changeLogLevel}
)(LogsPage);
