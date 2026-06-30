import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import DashboardContainer from './DashboardContainer';

// Mock useRemoteCSS hook
const mockUseRemoteCSS = vi.fn();
vi.mock('../../hooks/useRemoteCSS', () => ({
  useRemoteCSS: (...args: any[]) => mockUseRemoteCSS(...args),
}));

// Mock remote module component
vi.mock('dashboard_remote/Dashboard', () => ({
  __esModule: true,
  default: () => <div data-testid="federated-dashboard">Federated Dashboard</div>,
}));

describe('DashboardContainer Component', () => {
  const originalLocation = window.location;
  const reloadMock = vi.fn();

  beforeEach(() => {
    mockUseRemoteCSS.mockReset();
    reloadMock.mockClear();
    
    // Mock window.location.reload
    Object.defineProperty(window, 'location', {
      configurable: true,
      writable: true,
      value: { reload: reloadMock },
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      writable: true,
      value: originalLocation,
    });
  });

  it('should render LocalDashboardSkeleton when not loaded yet', () => {
    mockUseRemoteCSS.mockReturnValue({ loaded: false, error: null });
    render(<DashboardContainer />);
    
    expect(screen.getByTestId('dashboard-skeleton')).toBeInTheDocument();
    expect(screen.queryByTestId('federated-dashboard')).not.toBeInTheDocument();
  });

  it('should render ConnectionErrorCard on stylesheet error and trigger reload when clicked', async () => {
    mockUseRemoteCSS.mockReturnValue({ loaded: false, error: new Error('Failed to load CSS') });
    render(<DashboardContainer />);
    
    expect(screen.getByText(/Gagal memuat style dashboard/i)).toBeInTheDocument();
    
    const retryButton = screen.getByRole('button', { name: /reload page/i });
    await userEvent.click(retryButton);
    expect(reloadMock).toHaveBeenCalledTimes(1);
  });

  it('should render FederatedDashboard when CSS is loaded without errors', async () => {
    mockUseRemoteCSS.mockReturnValue({ loaded: true, error: null });
    render(<DashboardContainer />);
    
    const dashboard = await screen.findByTestId('federated-dashboard');
    expect(dashboard).toBeInTheDocument();
  });

  it('should trigger boundary fallback and reload on script error', async () => {
    mockUseRemoteCSS.mockReturnValue({ loaded: true, error: null });
    render(<DashboardContainer />);
    
    expect(await screen.findByTestId('federated-dashboard')).toBeInTheDocument();

    // Create a mock script element and dispatch an error event on it
    const script = document.createElement('script');
    script.src = 'http://localhost:3344/remoteEntry.js';
    document.body.appendChild(script);

    const event = new Event('error', { bubbles: true });
    Object.defineProperty(event, 'target', { value: script, enumerable: true });
    
    await act(async () => {
      window.dispatchEvent(event);
    });

    // Check that fallback ConnectionErrorCard is rendered
    expect(screen.getByText(/Gagal memuat dashboard/i)).toBeInTheDocument();

    // Click retry button on fallback
    const retryButton = screen.getByRole('button', { name: /reload page/i });
    await userEvent.click(retryButton);
    expect(reloadMock).toHaveBeenCalledTimes(1);

    document.body.removeChild(script);
  });
});
