import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RemoteModuleBoundary from './RemoteLoaderErrorBoundary';

describe('RemoteModuleBoundary Component', () => {
  it('should render children normally when no script error occurs', () => {
    render(
      <RemoteModuleBoundary remoteUrl="http://localhost:3344" fallback={<div>Error</div>}>
        <div data-testid="child">Normal Content</div>
      </RemoteModuleBoundary>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.queryByText('Error')).not.toBeInTheDocument();
  });

  it('should render function fallback when script fails to load', async () => {
    const fallbackFn = vi.fn().mockImplementation((url) => <div data-testid="fallback">Failed: {url}</div>);
    render(
      <RemoteModuleBoundary remoteUrl="http://localhost:3344" fallback={fallbackFn}>
        <div data-testid="child">Normal Content</div>
      </RemoteModuleBoundary>
    );

    // Dispatch error event with matching script URL
    const script = document.createElement('script');
    script.src = 'http://localhost:3344/remoteEntry.js';
    document.body.appendChild(script);

    const event = new Event('error', { bubbles: true });
    Object.defineProperty(event, 'target', { value: script, enumerable: true });

    await act(async () => {
      window.dispatchEvent(event);
    });

    expect(screen.queryByTestId('child')).not.toBeInTheDocument();
    expect(screen.getByTestId('fallback')).toBeInTheDocument();
    expect(fallbackFn).toHaveBeenCalledWith('http://localhost:3344/remoteEntry.js');

    document.body.removeChild(script);
  });

  it('should ignore script errors from non-matching URLs', async () => {
    render(
      <RemoteModuleBoundary remoteUrl="http://localhost:3344" fallback={<div>Error</div>}>
        <div data-testid="child">Normal Content</div>
      </RemoteModuleBoundary>
    );

    // Dispatch error event with non-matching script URL
    const script = document.createElement('script');
    script.src = 'http://localhost:9999/other.js';
    document.body.appendChild(script);

    const event = new Event('error', { bubbles: true });
    Object.defineProperty(event, 'target', { value: script, enumerable: true });

    await act(async () => {
      window.dispatchEvent(event);
    });

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.queryByText('Error')).not.toBeInTheDocument();

    document.body.removeChild(script);
  });

  it('should ignore errors if target is not a SCRIPT tag', async () => {
    render(
      <RemoteModuleBoundary remoteUrl="http://localhost:3344" fallback={<div>Error</div>}>
        <div data-testid="child">Normal Content</div>
      </RemoteModuleBoundary>
    );

    // Dispatch error event with a non-script element target (e.g. an image)
    const img = document.createElement('img');
    img.src = 'http://localhost:3344/broken.png';
    document.body.appendChild(img);

    const event = new Event('error', { bubbles: true });
    Object.defineProperty(event, 'target', { value: img, enumerable: true });

    await act(async () => {
      window.dispatchEvent(event);
    });

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.queryByText('Error')).not.toBeInTheDocument();

    document.body.removeChild(img);
  });
});
