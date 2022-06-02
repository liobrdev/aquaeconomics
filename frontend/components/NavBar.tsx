import { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import throttle from 'lodash/throttle';

import Link from 'next/link';

import { NavigationIcon, NavigationMain } from '@/components';
import { AppState } from '@/types';
import { getScrollY } from '@/utils';


const imagesUrl = process.env.NEXT_PUBLIC_IMAGES_URL || '';

let prevScrollPos = 0;

class NavBar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { isHidden: false };
    this.onScroll = throttle(this.onScroll.bind(this), 200, {
      leading: true,
    });
  }

  onScroll() {
    if (this.props.navigationOn) return;

    const currentScrollPos = getScrollY();

    if (currentScrollPos < prevScrollPos || currentScrollPos === 0) {
      this.setState({ isHidden: false });
    } else {
      this.setState({ isHidden: true });
    }

    prevScrollPos = currentScrollPos;
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
    prevScrollPos = getScrollY();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  render() {
    return (
      <nav className={`NavBar${this.state.isHidden ? ' is-hidden' : ''}`}>
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

type Props = ConnectedProps<typeof connector>;

interface State {
  isHidden: boolean;
}

export default connector(NavBar);
