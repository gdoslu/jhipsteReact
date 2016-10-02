import React, {Component} from 'react';
import {connect} from 'react-redux';

import Translate from 'react-translate-component';
import { getApiDocs } from '../../../reducers/administration.reducer';

export class ApiDocsPage extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.getApiDocs();
  }

  render() {
    const { apiDocs, isFetching } = this.props;
    return (
      <div className="well">
        <div>
          <h2 translate="health.title">API Documentations</h2>
          FIX ME
          <hr/>
          <div className="row">
            <div className="col-sm-10">
              {JSON.stringify(apiDocs)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  ({administration}) => ({apiDocs: administration.apiDocs, isFetching: administration.isFetching}),
  {getApiDocs}
)(ApiDocsPage);
