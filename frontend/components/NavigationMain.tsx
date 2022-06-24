import { Component, MouseEvent, createRef, RefObject } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock';

import { NextRouter, withRouter } from 'next/router';

import { AppDispatch, AppState } from '@/types';

import { MenuIcon, SiteLinks } from './';


class NavigationMain extends Component<Props> {
  private component: RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);
    this.component = createRef();
    this.handleClose = this.handleClose.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleClose(e: MouseEvent<HTMLButtonElement | HTMLDivElement>) {
    e.preventDefault();
    this.props.closeNavigation();
  }

  handleLogout = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // this.props.startLogoutUser();
  }

  componentDidMount() {
    if (this.component.current) disableBodyScroll(this.component.current);
  }

  componentWillUnmount() {
    if (this.component.current) enableBodyScroll(this.component.current);
  }

  render() {
    return (
      <>
        <div className='NavigationMain-overlay' onClick={this.handleClose} />
        <div className='NavigationMain is-on' ref={this.component}> 
          <div className='MenuIcon-container'>
            <MenuIcon
              className='is-active'
              onClick={this.handleClose}
              type='button'
            />
          </div>
          <SiteLinks />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  user: state.user.user,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  closeNavigation: () => {
    dispatch({ type: 'NAVIGATION_CLOSE' });
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  router: NextRouter;
}

export default connector(withRouter(NavigationMain));
