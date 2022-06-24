import React, { Component, createRef, RefObject } from 'react';
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock';


interface Props {
  className?: string;
  isFullscreen?: boolean;
  isLoaded?: boolean;
}

interface State {
  spinnerOn: boolean;
}

export default class LoadingView extends Component<Props, State> {
  private component: RefObject<HTMLDivElement>;
  private loadingTimeout?: ReturnType<typeof setTimeout>;

  constructor(props: Props) {
    super(props);
    this.component = createRef();
    this.state = { spinnerOn: false };
    this.loadingTimeout = undefined;
  }

  componentDidMount() {
    this.loadingTimeout = setTimeout(() => {
      this.setState({ spinnerOn: true });
    }, 200);

    const { isFullscreen, isLoaded } = this.props;

    if (isFullscreen && !isLoaded && this.component.current) {
      disableBodyScroll(this.component.current);
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (
      !prevProps.isLoaded
      && this.props.isLoaded
      && this.props.isFullscreen
      && this.component.current
    ) {
      enableBodyScroll(this.component.current);
    }
  }

  componentWillUnmount() {
    if (this.loadingTimeout) clearTimeout(this.loadingTimeout);

    const { isFullscreen, isLoaded } = this.props;

    if (isFullscreen && isLoaded && this.component.current) {
      enableBodyScroll(this.component.current);
    }
  }

  render() {
    const { spinnerOn } = this.state;
    const { className } = this.props;

    return (
      <div
        className={`LoadingView${!!className ? ' ' + className : ''}`}
        ref={this.component}
      >
        <div className={
          `LoadingView-spinner${spinnerOn ? ' is-spinning' : ''}`
        }/>
      </div>
    );
  }
}