import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DesignPage from './DesignPage';

describe('DesignPage', () => {
  it('renders heading and overview back button', () => {
    const handleBack = vi.fn();
    render(<DesignPage onBack={handleBack} />);
    expect(screen.getByRole('heading', { level: 1, name: 'Design' })).toBeInTheDocument();
    
    const backBtn = screen.getByRole('button', { name: /overview/i });
    expect(backBtn).toBeInTheDocument();
    fireEvent.click(backBtn);
    expect(handleBack).toHaveBeenCalledTimes(1);
  });

  it('renders design cards and filters by category', async () => {
    render(<DesignPage />);
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Editorial' })).toBeInTheDocument();

    const initialCards = screen.getAllByTestId('design-card');
    expect(initialCards.length).toBe(6);

    fireEvent.click(screen.getByRole('button', { name: 'Editorial' }));
    expect(screen.getByText('NASA Design Compendium 2025')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText('Tatva 26 Festival Identity')).not.toBeInTheDocument();
    });
  });

  it('opens and closes the design details modal', async () => {
    render(<DesignPage />);
    const card = screen.getByText('Tatva 26 Festival Identity');
    fireEvent.click(card);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Project Brief & Overview')).toBeInTheDocument();

    const closeBtn = screen.getByLabelText('Close design modal');
    fireEvent.click(closeBtn);
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});
