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
                <Link href={{ pathname: '/stormwater' }}>
                  <a>Reduce Your Stormwater Bill</a>
                </Link>
              </li>
              <li>
                <Link href={{ pathname: '/engineering' }}>
                  <a>Site Engineering</a>
                </Link>
              </li>
              <li>
                <Link href={{ pathname: '/surveying' }}>
                  <a>Surveying</a>
                </Link>
              </li>
              <li>
                <Link href={{ pathname: '/ersa_plans' }}>
                  <a>ERSA Plans</a>
                </Link>
              </li>
              <li>
                <Link href={{ pathname: '/zoning' }}>
                  <a>Zoning</a>
                </Link>
              </li>
              <li>
                <Link href={{ pathname: '/consulting' }}>
                  <a>Consulting</a>
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
                <Link href={{ pathname: '/highlights' }}>
                  <a>Highlights</a>
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
