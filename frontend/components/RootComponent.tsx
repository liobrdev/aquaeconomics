import React, { Component, ReactNode } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import throttle from 'lodash/throttle';

import Head from 'next/head';
import { NextRouter, withRouter } from 'next/router';

import { AppState, AppDispatch } from '@/types';

import { Footer, NavBar } from './';


const description =
  'Stormwater cost analysis, site engineering, and ' +
  'surveying for Philadelphia and the Delaware Valley';

class RootComponent extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.handleEsc = this.handleEsc.bind(this);
    this.handleResize = throttle(this.handleResize.bind(this), 200, {
      leading: true,
    });
  }

  handleEsc(e: KeyboardEvent) {
    if (e.code === 'Escape') this.props.closeNavigation();
  }

  handleResize() {
    document.body.style.height = window.innerHeight + 'px';

    const servicesBg =
      document.getElementById('homeServicesImg') as HTMLImageElement | null;

    if (servicesBg) {
      if (!window.matchMedia('(min-width: 600px)').matches) {
        servicesBg.style.left =
          `${(window.innerWidth - servicesBg.width) / 2}px`;
      } else {
        servicesBg.style.left = '';
      }
    }

    const contactBg =
      document.getElementById('homeContactImg') as HTMLImageElement | null;

    if (contactBg) {
      contactBg.style.left =
        `${(window.innerWidth - contactBg.width) / 2}px`;
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleEsc);
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.router.pathname !== prevProps.router.pathname) {
      window.scrollTo(0, 0);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEsc);
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    return (
      <>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
          />
          <link
            rel="shortcut icon"
            type="image/x-icon"
            sizes="48x48"
            href="/favicon.ico"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="msapplication-TileColor" content="#0492C2" />
          <meta name="theme-color" content="#0492C2" />
          <meta itemProp="name" content="Aqua Economics &amp; Engineering" />
          <meta itemProp="description" content={description} />
          <meta name="description" content={description} />
          <meta property="og:title" content="Aqua Economics &amp; Engineering" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://aquaeconomics.com" />
          <meta property="og:description" content={description} />
        </Head>
        <div className='SiteContainer'>
          <NavBar />
          {this.props.children}
          <Footer />
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
  children: ReactNode;
  router: NextRouter;
}

export default connector(withRouter(RootComponent));