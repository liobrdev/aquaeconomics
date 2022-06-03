import { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import throttle from 'lodash/throttle';

import Link from 'next/link';
import { NextRouter, withRouter } from 'next/router';

import { NavigationIcon, NavigationMain } from '@/components';
import { AppState } from '@/types';
import { getScrollY } from '@/utils';


const imagesUrl = process.env.NEXT_PUBLIC_IMAGES_URL || '';

let prevScrollPos = 0;

class NavBar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      banner: null,
      isHidden: false,
      isPastBanner: false,
    };

    this.onScroll = throttle(this.onScroll.bind(this), 200, {
      leading: true,
    });
  }

  onScroll() {
    if (this.props.navigationOn) return;

    const currentScrollPos = getScrollY();

    if (currentScrollPos < prevScrollPos) {
      this.setState({ isHidden: false });
    } else {
      this.setState({ isHidden: true });
    }

    if (
      this.state.banner
      && currentScrollPos < this.state.banner.clientHeight - 130
    ) {
      this.setState({ isPastBanner: false });
    } else {
      this.setState({ isPastBanner: true });
    }

    prevScrollPos = currentScrollPos;
  }

  setBanner() {
    let name = this.props.router.pathname;

    if (name === '/') name = 'home';
    else name = name.slice(1);

    this.setState({
      banner: document.getElementById(`${name}-banner`),
    }, () => {
      if (!this.state.banner) this.setState({ isPastBanner: true });
      else this.setState({ isPastBanner: false });
    });
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
    this.setBanner();
    prevScrollPos = getScrollY();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.router.pathname !== prevProps.router.pathname) {
      this.setBanner();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  render() {
    return (
      <nav
        className={`NavBar${
          this.state.isHidden ? ' is-hidden' : ''
        }${
          this.state.isPastBanner ? ' is-pastBanner' : ''
        }`}
      >
        <div className='Logo'>
          <Link href={{ pathname: '/' }}>
            <a>
              <img
                className='Logo-image'
                src={`${imagesUrl}/Logo.png`}
                alt='Aquaeconomics Logo'
              />
            </a>
          </Link>
        </div>
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
  banner: HTMLElement | null;
  isHidden: boolean;
  isPastBanner: boolean;
}

export default connector(withRouter(NavBar));
