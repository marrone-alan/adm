import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Icon from '@mdi/react';
import {
  mdiMenu,
  mdiClose,
  mdiArrowRightDropCircle,
  mdiArrowDownDropCircle,
  mdiAccountBox,
  mdiLogout,
} from '@mdi/js';

// actions
import { showHideMenu } from '../../actions/menu';
// config
import routes from './configRoutes';
// options
import { routesDisable } from './options';
// styles
import {
  Wrapper,
  Content,
  Featured,
  Menu,
  DropDown,
  DropDownEnable,
  SubMenu,
  Hamburguer,
  SvgWrapper,
  IconSubmenu,
} from './style';
import { Logo, SubTitle } from '../../styles/title';
// services
import { logout } from '../../services/auth';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSubMenu: routes.map(() => false),
    };
  }

  handleDropDown = (e) => {
    this.setState((prevState) => ({
      showSubMenu: {
        ...routes.map(() => false),
        [e]: !prevState.showSubMenu[e],
      },
    }));
  };

  handleLogout = () => {
    logout();
    this.props.history.push('/login');
  };

  createMenu(arrayRoutes, profile) {
    const { isMenuVisible } = this.props;

    return arrayRoutes
      .filter((route) => route.profiles.includes(parseInt(profile)))
      .map((route, index) => {
        if (route.path === '#') {
          return (
            <DropDown key={index}>
              <DropDownEnable
                onClick={() => {
                  this.handleDropDown(index);
                }}
              >
                {route.icon ? <SvgWrapper>{route.icon}</SvgWrapper> : ''}
                <span>{route.desc}</span>
                <IconSubmenu>
                  <Icon
                    path={
                      this.state.showSubMenu[index]
                        ? mdiArrowDownDropCircle
                        : mdiArrowRightDropCircle
                    }
                    size={0.7}
                    color="#def2ff"
                  />
                </IconSubmenu>
              </DropDownEnable>
              <SubMenu
                showSubMenu={this.state.showSubMenu[index]}
                showMenu={isMenuVisible}
              >
                <div>
                  <ul>{this.createMenu(route.childRoutes, profile)}</ul>
                </div>
              </SubMenu>
            </DropDown>
          );
        } else {
          return (
            <li key={index}>
              <Link to={route.path}>
                {route.icon ? <SvgWrapper>{route.icon}</SvgWrapper> : ''}
                <span>{route.desc}</span>
              </Link>
            </li>
          );
        }
      });
  }

  render() {
    // check the url to show the component
    if (routesDisable.includes(this.props.location.pathname)) {
      return '';
    }

    const { isMenuVisible, showHideMenu } = this.props;

    return (
      <div>
        <Hamburguer onClick={showHideMenu} showMenu={isMenuVisible}>
          <Icon path={mdiMenu} size={1} color="#fff" />
        </Hamburguer>
        <Wrapper showMenu={isMenuVisible}>
          <Content>
            <Featured>
              <Link to={'/'}>
                <Logo>ADM</Logo>
              </Link>
              <Icon
                onClick={showHideMenu}
                path={mdiClose}
                size={1}
                color="#def2ff"
              />
            </Featured>
            <Featured>
              <Link to={'/perfil'}>
                <SubTitle>Alan Marrone</SubTitle>
              </Link>

              <Icon path={mdiAccountBox} size={1} color="#def2ff" />
            </Featured>
            <Featured onClick={this.handleLogout}>
              <SubTitle>Logout</SubTitle>
              <Icon path={mdiLogout} size={1} color="#def2ff" />
            </Featured>
            <Menu>
              <ul>{this.createMenu(routes, 1)}</ul>
            </Menu>
          </Content>
        </Wrapper>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  isMenuVisible: store.menu.isMenuVisible,
});

export default withRouter(
  connect(mapStateToProps, { showHideMenu })(Navigation)
);
