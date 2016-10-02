import React, { Component } from 'react';
import {connect} from 'react-redux';
import ModalLogin from '../component/Modal/ModalLogin';
import {login} from '../../reducers/authentication.reducer';


export class LoginPage extends Component {

  constructor(props){
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      showModalLogin: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      showModalLogin: !nextProps.isAuthenticated
    });
  }

  componentDidMount(){
    this.setState({
      showModalLogin: !this.props.isAuthenticated
    });
  }

  handleLogin(username, password, rememberMe = false){
    this.props.login(username, password, rememberMe);
  }
  render() {
    return (
      <ModalLogin isShow={this.state.showModalLogin} handleLogin={this.handleLogin}/>
    )
  }
}

export default connect(
  store => ({account: store.authentication.account, isAuthenticated: store.authentication.isAuthenticated}),
  {login}
)(LoginPage);
