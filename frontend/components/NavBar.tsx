import { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import throttle from 'lodash/throttle';

import Link from 'next/link';
import { NextRouter, withRouter } from 'next/router';

import { NavigationIcon, NavigationMain } from '@/components';
import { AppState } from '@/types';


const imagesUrl = process.env.NEXT_PUBLIC_IMAGES_URL || '';

class NavBar extends Component<Props, State> {
  private loadingTimeout?: ReturnType<typeof setTimeout>;

  constructor(props: Props) {
    super(props);

    this.state = {
      banner1: null,
      banner2: null,
      isOverBanner1: false,
      isOverBanner2: false,
    };
    
    this.onScroll = throttle(this.onScroll.bind(this), 200, {
      leading: true,
    });

    this.loadingTimeout = undefined;
    this.checkBannerOverlap = this.checkBannerOverlap.bind(this);
    this.checkIsOverBanner1 = this.checkIsOverBanner1.bind(this);
    this.checkIsOverBanner2 = this.checkIsOverBanner2.bind(this);
    this.setBanners = this.setBanners.bind(this);
    this.areBannersLoaded = this.areBannersLoaded.bind(this);
  }

  onScroll() {
    if (this.props.navigationOn) return;
    this.checkIsOverBanner1();
    this.checkIsOverBanner2();
  }

  checkIsOverBanner1() {
    if (this.state.banner1) {
      const { top, bottom } = this.state.banner1.getBoundingClientRect();

      if (43 >= top && 43 <= bottom) {
        return this.setState({ isOverBanner1: true });
      } else this.setState({ isOverBanner1: false });
    }
  }

  checkIsOverBanner2() {
    if (this.state.banner2) {
      const { top, bottom } = this.state.banner2.getBoundingClientRect();

      if (43 >= top && 43 <= bottom) {
        this.setState({ isOverBanner2: true });
      } else this.setState({ isOverBanner2: false });
    }
  }

  setBanners() {
    let name = this.props.router.pathname;

    if (name === '/') name = 'home';
    else name = name.slice(1);

    this.setState({ banner1: document.getElementById(`${name}-banner1`) });
    this.setState({ banner2: document.getElementById(`${name}-banner2`) });
  }

  areBannersLoaded() {
    return (
      !!this.state.banner1 && this.state.banner1.clientHeight !== 0
      && !!this.state.banner2 && this.state.banner2.clientHeight !== 0
    );
  }

  checkBannerOverlap() {
    this.setBanners();

    if (this.areBannersLoaded()) {
      this.checkIsOverBanner1();
      this.checkIsOverBanner2();
      return;
    }

    let counter = 240;

    const recursiveCheck = () => {
      this.loadingTimeout = setTimeout(() => {
        this.setBanners();
        --counter;

        if (this.areBannersLoaded()) {
          this.checkIsOverBanner1();
          this.checkIsOverBanner2();
        } else if (counter === 0) {
          console.error('Banners did not load in a reasonable time!');
        } else recursiveCheck();
      }, 250);
    };

    recursiveCheck();
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
    this.checkBannerOverlap();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.router.pathname !== prevProps.router.pathname) {
      this.checkBannerOverlap();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
    if (this.loadingTimeout) clearTimeout(this.loadingTimeout);
  }

  render() {
    const { isOverBanner1, isOverBanner2 } = this.state;

    return (
      <nav
        className={`NavBar${
          isOverBanner1 ? ' is-overBanner1' : ''
        }${
          isOverBanner2 ? ' is-overBanner2' : ''
        }`}
      >
        {/* <div className='Logo'>
          <Link href={{ pathname: '/' }}>
            <a>
              <img
                className='Logo-image'
                src={`${imagesUrl}/Logo.png`}
                alt='Aquaeconomics Logo'
              />
            </a>
          </Link>
        </div> */}
        {this.props.navigationOn ? <NavigationMain /> : <NavigationIcon />}
      </nav>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  navigationOn: state.navigation.navigationOn,
  user: state.user.user,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  router: NextRouter;
}

interface State {
  banner1: HTMLElement | null;
  banner2: HTMLElement | null;
  isOverBanner1: boolean;
  isOverBanner2: boolean
}

export default connector(withRouter(NavBar));
