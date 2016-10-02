import React from 'react';
import { redirectToLoginWithMessage } from '../reducers/authentication.reducer';
import { getSession } from '../reducers/authentication.reducer';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  loading: state.authentication.loading,
  isAuthenticated: state.authentication.isAuthenticated,
});
const mapDispatchToProps = {
  redirectToLoginWithMessage,
  getSession
};

const privateRoute = (Wrapped) => connect(mapStateToProps, mapDispatchToProps)(class extends React.Component {

  componentDidMount() {
    this.props.getSession();
    this.redirectIfNotLogged(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.redirectIfNotLogged(nextProps);
  }

  redirectIfNotLogged(props) {
    const {loading, isAuthenticated} = props;
    if (loading === false && !isAuthenticated) {
      this.props.redirectToLoginWithMessage('login.messages.error.authentication');
    }
  }

  render() {
    const {loading, isAuthenticated} = this.props;
    if (loading || !isAuthenticated) {
      return (
        <div className="center loader">
          <div>Loading...</div>
        </div>
      );
    }

    return <Wrapped {...this.props} />;
  }
});

export default privateRoute;
