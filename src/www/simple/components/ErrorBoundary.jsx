import React from 'react';

export class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: null };

      this.componentDidCatch = this.componentDidCatch.bind(this);
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true, error };
    }
  
    componentDidCatch(error, errorInfo) {
      console.error(`ErrorBoundary: ${error}, ${JSON.stringify(errorInfo)}`);
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <>
            <h1>An error occurred.</h1> 
            <h2>{this.state.error.code}</h2>
            <p>{this.state.error.message}</p>
            <h2>More info</h2>
            <code><pre>{this.state.error.stack}</pre></code>
        </>;
      }
  
      return this.props.children; 
    }
  }