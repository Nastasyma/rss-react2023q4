import { Component, ReactNode } from 'react';
import FallBackUIComponent from './FallBackUI/FallBackUIComponent';

interface ErrorBoundaryProps {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: string;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: '',
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error: error.toString(),
    };
  }

  render() {
    if (this.state.hasError) {
      return <FallBackUIComponent errorText={this.state.error} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
