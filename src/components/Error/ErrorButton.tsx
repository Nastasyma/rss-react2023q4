import { Component } from 'react';

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
      throw new Error('Custom Error');
    }

    return <button onClick={this.handleClick}>{this.props.title}</button>;
  }
}

export default ErrorButton;
