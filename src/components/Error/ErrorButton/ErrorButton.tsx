import { Component } from 'react';
import style from './ErrorButton.module.scss';

interface ErrorButtonProps {
  title: string;
}

interface ErrorButtonState {
  hasError: boolean;
}

class ErrorButton extends Component<ErrorButtonProps, ErrorButtonState> {
  constructor(props: ErrorButtonProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  handleClick = () => {
    this.setState({ hasError: true });
  };

  render() {
    if (this.state.hasError) {
      throw new Error('Too much caffeine injected into the system!');
    }

    return (
      <button title="Click to throw error" className={style.errorButton} onClick={this.handleClick}>
        {this.props.title}
      </button>
    );
  }
}

export default ErrorButton;
