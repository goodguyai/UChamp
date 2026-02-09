import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black-surface flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold-primary/10 flex items-center justify-center">
              <span className="text-gold-primary text-2xl font-bold">!</span>
            </div>
            <h1 className="text-2xl font-bold text-gold-primary mb-4 uppercase tracking-wide">
              Something Went Wrong
            </h1>
            <p className="text-gray-400 mb-6">
              The app hit an unexpected error. Refresh to get back in the game.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Reload App
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-12">
      <div className="w-12 h-12 border-4 border-gray-800 border-t-gold-primary rounded-full animate-spin" />
    </div>
  );
}
