import { Component, MouseEvent, createRef, RefObject } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock';

import { NextRouter, withRouter } from 'next/router';

import { AppDispatch, AppState } from '@/types';

import { MenuIcon, NavigationSub } from './';


class NavigationMain extends Component<Props> {
  private component: RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);
    this.component = createRef();
    this.handleClose = this.handleClose.bind(this);
    this.handleHome = this.handleHome.bind(this);
    this.handleServices = this.handleServices.bind(this);
    this.handleCompany = this.handleCompany.bind(this);
  }

  handleClose(e: MouseEvent<HTMLButtonElement | HTMLDivElement>) {
    e.preventDefault();
    if (this.component.current) enableBodyScroll(this.component.current);
    this.props.closeNavigation();
  }

  handleHome(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    this.props.router.push('/');
    this.props.closeNavigation();
  }

  handleServices(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (this.props.servicesOn) this.props.closeServices();
      else this.props.showServices();
  }

  handleCompany(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (this.props.companyOn) this.props.closeCompany();
      else this.props.showCompany();
  }

  handleLogout = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // this.props.startLogoutUser()
  }

  componentDidMount() {
    if (this.component.current) disableBodyScroll(this.component.current);
  }

  componentWillUnmount() {
    if (this.component.current) enableBodyScroll(this.component.current);
  }

  render() {
    const { servicesOn, companyOn, user } = this.props;

    return (
      <>
        <div
          className='NavigationMain-overlay'
          onClick={this.handleClose}
        />
        <div
          className='NavigationMain is-on'
          ref={this.component}
        > 
          <div className='MenuIcon-container'>
            <MenuIcon
              className='is-active'
              onClick={this.handleClose}
              type='button'
            />
          </div>
          <div className='NavigationMain-buttons'>
            <button
              className='NavigationMain-button'
              type='button'
              onClick={this.handleHome}
            >
              Home
            </button>
            <br/>
            <button
              className={`NavigationMain-button${servicesOn ? ' is-on' : ''}`}
              type='button'
              onClick={this.handleServices}
            >
              Services
            </button>
            <br/>
            {servicesOn && <NavigationSub type='services' />}
            <button
              className={`NavigationMain-button${companyOn ? ' is-on' : ''}`}
              type='button'
              onClick={this.handleCompany}
            >
              Company
            </button>
            <br/>
            {companyOn && <NavigationSub type='company' />}
            {user && (
              <button
                className='NavigationMain-button'
                type='button'
                onClick={this.handleLogout}
              >
                Log out
              </button>
            )}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  servicesOn: state.navigation.servicesOn,
  companyOn: state.navigation.companyOn,
  user: state.user.user,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  closeNavigation: () => {
    dispatch({ type: 'NAVIGATION_CLOSE' });
  },
  showServices: () => {
    dispatch({ type: 'SERVICES_SHOW' });
  },
  closeServices: () => {
    dispatch({ type: 'SERVICES_CLOSE' });
  },
  showCompany: () => {
    dispatch({ type: 'COMPANY_SHOW' });
  },
  closeCompany: () => {
    dispatch({ type: 'COMPANY_CLOSE' });
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  router: NextRouter;
}

export default connector(withRouter(NavigationMain));
