import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="bg-card rounded-2xl shadow-lg p-8 max-w-md w-full text-center border border-border">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Etwas ist schief gelaufen
            </h1>
            <p className="text-muted-foreground mb-6">
              Die App hat einen Fehler festgestellt. Bitte laden Sie die Seite neu.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              Seite neu laden
            </button>
            {this.state.error && (
              <details className="mt-6 text-left">
                <summary className="text-sm text-muted-foreground cursor-pointer">
                  Technische Details
                </summary>
                <pre className="mt-2 p-3 bg-muted rounded-lg text-xs text-muted-foreground overflow-auto">
                  {this.state.error.message}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
