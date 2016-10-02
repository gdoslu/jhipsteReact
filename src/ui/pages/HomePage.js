import React, { Component } from 'react';
import {connect} from 'react-redux';
import Translate from 'react-translate-component';
import { Link } from 'react-router';
import { getSession } from '../../reducers/authentication.reducer';


export class HomePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: props.account
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentUser: nextProps.account
    });
  }

  render() {
    const {
      currentUser
    } = this.state;

    return (
      <div className="well">
        <div>
          <div className="row">
            <div className="col-md-4">
              <span className="hipster img-responsive img-rounded"></span>
            </div>
            <div className="col-md-8">
              <h2>Welcome, Java Hipster powered by React!</h2>
              <p className="lead">This is your homepage</p>
              <div>
              {
                (currentUser && currentUser.login) ? (
                    <div className="alert alert-success">
                      You are logged in as user "{currentUser.login}".
                    </div>
                ) : (
                  <div>
                    <div className="alert alert-warning">
                      If you want to <Link to="/login" className="alert-link">sign in</Link>, you can try the default accounts:<br/>- Administrator (login="admin" and password="admin") <br/>- User (login="user" and password="user").
                    </div>

                    <div className="alert alert-warning">
                      You don't have an account yet? <a className="alert-link">Register a new account</a>
                    </div>
                  </div>
                )
              }
              </div>
              <Translate component="p" content="home.question"/>
              <p>
                If you have any question on JHipster:
              </p>

              <ul>
                <li><a href="http://jhipster.github.io/" target="_blank">JHipster homepage</a></li>
                <li><a href="http://stackoverflow.com/tags/jhipster/info" target="_blank">JHipster on Stack Overflow</a></li>
                <li><a href="https://github.com/jhipster/generator-jhipster/issues?state=open" target="_blank" >JHipster bug tracker</a></li>
                <li><a href="https://gitter.im/jhipster/generator-jhipster" target="_blank">JHipster public chat room</a></li>
                <li><a href="https://twitter.com/java_hipster" target="_blank" >follow @java_hipster on Twitter</a></li>
              </ul>

              <p>
                <span >If you like JHipster, don't forget to give us a star on </span>&nbsp;<a href="https://github.com/jhipster/generator-jhipster" target="_blank">Github</a>!
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  store => ({account: store.authentication.account, isAuthenticated: store.authentication.isAuthenticated}),
  {getSession}
)(HomePage);
