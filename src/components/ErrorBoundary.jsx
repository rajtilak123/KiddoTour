import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an uncaught exception:', error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.clear();
    } catch (e) {
      console.error('Failed to clear localStorage on boundary reset:', e);
    }
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6" style={{
          backgroundColor: '#fcf8ff',
          backgroundImage: 'radial-gradient(at 50% 50%, hsla(271,78%,85%,0.3) 0px, transparent 50%)',
          fontFamily: "'Plus Jakarta Sans', Inter, sans-serif"
        }}>
          <div className="max-w-md w-full bg-white/70 backdrop-blur-xl border border-white/80 p-8 rounded-3xl shadow-xl text-center">
            <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-6 border border-red-100">
              <span className="material-symbols-outlined text-red-600 text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-800 mb-3 tracking-tight">Something went wrong</h1>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              An unexpected error occurred. You can attempt to reset the application state to resolve the issue.
            </p>
            {this.state.error && (
              <pre className="text-left text-xs bg-red-50/50 p-4 rounded-xl text-red-800 border border-red-100/50 mb-6 overflow-x-auto max-h-36 no-scrollbar font-mono leading-tight">
                {this.state.error.toString()}
              </pre>
            )}
            <button
              onClick={this.handleReset}
              className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all transform active:scale-95 text-sm"
            >
              Reset Application &amp; Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
