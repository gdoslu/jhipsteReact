import React, {Component, PropTypes} from 'react';
import Translate from 'react-translate-component';
import Navbar from 'react-bootstrap/lib/Navbar'
import NavDropdown from 'react-bootstrap/lib/NavDropdown'
import MenuItem from 'react-bootstrap/lib/MenuItem'
import NavItem from 'react-bootstrap/lib/NavItem'
import Nav from 'react-bootstrap/lib/Nav'
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';
import { locales } from '../../../config/translation';
import appConfig from '../../../config/appConfig';


export default class Header extends Component {
  static propTypes = {
    collapseNavbar: PropTypes.func,
    isNavbarCollapsed: PropTypes.bool,
    isAuthenticated: PropTypes.bool.isRequired,
    currentLocale: PropTypes.string.isRequired,
    handleLogout: PropTypes.func.isRequired,
    onLocaleChange: PropTypes.func.isRequired,
  };

  render() {
    const { currentLocale, isAuthenticated, handleLogout, onLocaleChange } = this.props;
    let menuItemAccountLogin = (
      <LinkContainer to="/login">
        <MenuItem eventKey={2.1}>
          <span className="glyphicon glyphicon-log-in"></span>&nbsp;
          <Translate component="span" content="global.menu.account.login" />
        </MenuItem>
      </LinkContainer>
    );
    let menuItemAccountRegister = (
      <LinkContainer to="/register">
        <MenuItem eventKey={2.2}>
          <span className="glyphicon glyphicon-plus-sign"></span>&nbsp;
          <Translate component="span" content="global.menu.account.register" />
        </MenuItem>
      </LinkContainer>
    );

    let menuItemEntities = null;

    let menuItemAccountSettings = null;
    let menuItemAccountPassword = null;
    let menuItemAccountSignOut = null;

    let menuItemAdministration = null;

    if (isAuthenticated) {

      menuItemEntities = (
        <NavDropdown eventKey={5}
                     title={<span><span className="glyphicon glyphicon-th-list"></span>&nbsp;<Translate component="span" content="global.menu.entities.main" /></span>}
                     id="basic-nav-dropdown">
        </NavDropdown>
      );

      menuItemAccountLogin = null;
      menuItemAccountRegister = null;
      menuItemAccountSettings = (
        <LinkContainer to="/account/settings">
          <MenuItem eventKey={2.3}>
            <span className="glyphicon glyphicon-wrench"></span>&nbsp;
            <Translate component="span" content="global.menu.account.settings" />
          </MenuItem>
        </LinkContainer>
      );
      menuItemAccountPassword = (
        <LinkContainer to="/account/password">
          <MenuItem eventKey={2.4}>
            <span className="glyphicon glyphicon-lock"></span>&nbsp;
            <Translate component="span" content="global.menu.account.password" />
          </MenuItem>
        </LinkContainer>
      );
      menuItemAccountSignOut = (
        <MenuItem eventKey={2.5} onClick={() => handleLogout()}>
          <span className="glyphicon glyphicon-log-out"></span>&nbsp;
          <Translate component="span" content="global.menu.account.logout" />
        </MenuItem>
      );


      menuItemAdministration = (
        <NavDropdown eventKey={4}
                     title={<span><span className="glyphicon glyphicon-tower"></span>&nbsp;<Translate component="span" content="global.menu.admin.main" /></span>}
                     id="basic-nav-dropdown">
          <LinkContainer to="/admin/gateway">
            <MenuItem eventKey={4.1}>
              <span className="glyphicon glyphicon-road"></span>&nbsp;
              <Translate component="span" content="global.menu.admin.gateway" />
            </MenuItem>
          </LinkContainer>
          <LinkContainer to="/admin/user-management">
            <MenuItem eventKey={4.2}>
              <span className="glyphicon glyphicon-user"></span>&nbsp;
              <Translate component="span" content="global.menu.admin.userManagement" />
            </MenuItem>
          </LinkContainer>
          <LinkContainer to="/admin/metrics">
            <MenuItem eventKey={4.3}>
              <span className="glyphicon glyphicon-dashboard"></span>&nbsp;
              <Translate component="span" content="global.menu.admin.metrics" />
            </MenuItem>
          </LinkContainer>
          <LinkContainer to="/admin/health">
            <MenuItem eventKey={4.4}>
              <span className="glyphicon glyphicon-heart"></span>&nbsp;
              <Translate component="span" content="global.menu.admin.health" />
            </MenuItem>
          </LinkContainer>
          <LinkContainer to="/admin/configuration">
            <MenuItem eventKey={4.5}>
              <span className="glyphicon glyphicon-list-alt"></span>&nbsp;
              <Translate component="span" content="global.menu.admin.configuration" />
            </MenuItem>
          </LinkContainer>
          <LinkContainer to="/admin/audits">
            <MenuItem eventKey={4.6}>
              <span className="glyphicon glyphicon-bell"></span>&nbsp;
              <Translate component="span" content="global.menu.admin.audits" />
            </MenuItem>
          </LinkContainer>
          <LinkContainer to="/admin/logs">
            <MenuItem eventKey={4.7}>
              <span className="glyphicon glyphicon-tasks"></span>&nbsp;
              <Translate component="span" content="global.menu.admin.logs" />
            </MenuItem>
          </LinkContainer>
          <LinkContainer to="/admin/docs">
            <MenuItem eventKey={4.8}>
              <span className="glyphicon glyphicon-book"></span>&nbsp;
              <Translate component="span" content="global.menu.admin.apidocs" />
            </MenuItem>
          </LinkContainer>
        </NavDropdown>
      );
    }

    return (
      <div>
        <div className="ribbon dev"><a href=""><Translate content="global.ribbon.dev" /></a></div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/" className="navbar-brand logo">
                <img className="logo-img" src="/assets/images/logo-jhipster.png" />
                <span><Translate content="global.title" /></span>&nbsp;
                <span className="navbar-version">{appConfig.version}</span>
              </Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav pullRight>
            <LinkContainer to="/">
              <NavItem eventKey={1} href="#"><span><span className="glyphicon glyphicon-home"></span>&nbsp;<Translate component="span" content="global.menu.home" /></span></NavItem>
            </LinkContainer>
            {menuItemEntities}
            <NavDropdown eventKey={2}
                         title={<span><span className="glyphicon glyphicon-user"></span>&nbsp;<Translate component="span" content="global.menu.account.main" /></span>}
                         id="basic-nav-dropdown">
              {menuItemAccountLogin}
              {menuItemAccountRegister}
              {menuItemAccountSettings}
              {menuItemAccountPassword}
              {menuItemAccountSignOut}
            </NavDropdown>
            {menuItemAdministration}
            <NavDropdown eventKey={3}
                         title={<span><span className="glyphicon glyphicon-flag"></span>&nbsp;<Translate component="span" content="global.menu.language" /></span>}
                         id="basic-nav-dropdown">
              {locales.map((lang, i) =>  <MenuItem eventKey={`3.${i}`} onClick={() => onLocaleChange(lang)} className={currentLocale === lang ? 'active' : ''} >{lang}</MenuItem>)}
            </NavDropdown>
          </Nav>
        </Navbar>
      </div>
    );
  }
}





