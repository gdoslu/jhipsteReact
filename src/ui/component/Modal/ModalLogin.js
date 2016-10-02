import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';
import FormControl from 'react-bootstrap/lib/FormControl';
import Translate from 'react-translate-component';
import ReactDOM from 'react-dom';


class ModalLogin extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.state = {
      username: null,
      password: null,
    }
  }

  handleSubmit() {
    const { handleLogin } = this.props;
    const { username, password } = this.state;
    handleLogin(username, password, false);  // FIXME remember me value must be passed
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }
  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  render() {
    const { authenticationError, isShow, onHide } = this.props;
    return (
      <Modal show={isShow}  onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Translate content="login.title" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-4 col-md-offset-4">
              <h1><Translate content="login.title" /></h1>
            </div>
            <div className="col-md-8 col-md-offset-2">
              { authenticationError ? <div className="alert alert-danger">
                <strong>Failed to sign in!</strong> <Translate content="login.messages.error.authentication" />
              </div>
                : null}
            </div>
            <div className="col-md-8 col-md-offset-2">
                <div className="form-group">
                  <label htmlFor="username"><Translate content="global.form.username" /></label>
                  <FormControl id="username"
                    type="text"
                    placeholder={<Translate content="global.form.username.placeholder" />}
                    onChange={this.handleUsernameChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password"><Translate content="global.form.password" /></label>
                  <FormControl type="password" id="password" placeholder="Password"
                               onChange={this.handlePasswordChange}
                  />
                </div>
                <a className="btn btn-primary" onClick={this.handleSubmit}><Translate content="login.form.button" /></a>
              <p></p>
              <div className="alert alert-warning">
                <a className="alert-link" onClick={() => this.props.handleForgottenPass}><Translate content="login.password.forgot"/></a>
              </div>
              <div className="alert alert-warning">
                You don't have an account yet? <a className="alert-link" onClick={() => this.props.handleRegister}><Translate content="global.messages.info.register"/></a>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

ModalLogin.propTypes = {
  isShow: PropTypes.bool.isRequired,
  onHide: PropTypes.func,
  authenticationError: PropTypes.bool,
  handleLogin: PropTypes.func.isRequired,
  handleForgottenPass: PropTypes.func,
  handleRegister: PropTypes.func,
};

export default ModalLogin;


