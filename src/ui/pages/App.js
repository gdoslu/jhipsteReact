import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSession } from '../../reducers/authentication.reducer';
import { setLocale } from '../../reducers/locale.reducer';
import { locales } from 'config/translation';
import Header from '../component/Header/Header';
import {logout} from '../../reducers/authentication.reducer';

export class App extends Component {

  constructor(props){
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    this.props.getSession();
  }

  handleLogout(){
    this.props.logout();
  }

  render() {
    return (
      <div>
        <Header currentLocale={this.props.currentLocale} onLocaleChange={this.props.setLocale} isAuthenticated={this.props.isAuthenticated} handleLogout={this.handleLogout}/>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default connect(
  store => ({isAuthenticated: store.authentication.isAuthenticated, currentLocale: store.locale.currentLocale}),
  {getSession, setLocale, logout}
)(App);
