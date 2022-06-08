import { Component } from 'react';

import Link from 'next/link';


interface Props {
  type: 'services' | 'company';
}

interface State {
  isOn: boolean;
}

export default class NavigationSub extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { isOn: false };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isOn: true });
    }, 10)
  }

  render() {
    return (
      <div className={`NavigationSub${this.state.isOn ? ' is-on' : ''}`}>
        <ul className='NavigationSub-links'>
          {this.props.type === 'services' && (
            <>
              <li>
                <Link href={{ pathname: '/site_design' }}>
                  <a>Site Planning &amp; Design</a>
                </Link>
              </li>
              <li>
                <Link href={{ pathname: '/surveying' }}>
                  <a>Land Surveying</a>
                </Link>
              </li>
              <li>
                <Link href={{ pathname: '/water_resources' }}>
                  <a>Water Resources</a>
                </Link>
              </li>
              <li>
                <Link href={{ pathname: '/stormwater' }}>
                  <a>Stormwater Bill Analysis</a>
                </Link>
              </li>
            </>
          )}
          {this.props.type === 'company' && (
            <>
              <li>
                <Link href={{ pathname: '/about' }}>
                  <a>About Us</a>
                </Link>
              </li>
              <li>
                <Link href={{ pathname: '/portfolio' }}>
                  <a>Portfolio</a>
                </Link>
              </li>
              <li>
                <Link href={{ pathname: '/contact' }}>
                  <a>Contact</a>
                </Link>
              </li>
              <li>
                <Link href={{ pathname: '/careers' }}>
                  <a>Careers</a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    );
  }
}
