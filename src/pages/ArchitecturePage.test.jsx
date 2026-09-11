import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ArchitecturePage from './ArchitecturePage';

describe('ArchitecturePage', () => {
  it('renders heading and overview back button', () => {
    const handleBack = vi.fn();
    render(<ArchitecturePage onBack={handleBack} />);
    expect(screen.getByRole('heading', { level: 1, name: 'Architecture' })).toBeInTheDocument();
    
    const backBtn = screen.getByRole('button', { name: /overview/i });
    expect(backBtn).toBeInTheDocument();
    fireEvent.click(backBtn);
    expect(handleBack).toHaveBeenCalledTimes(1);
  });

  it('renders category filter pills and filters projects', async () => {
    render(<ArchitecturePage />);
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Residential' })).toBeInTheDocument();

    const initialCards = screen.getAllByTestId('architecture-card');
    expect(initialCards.length).toBe(6);

    fireEvent.click(screen.getByRole('button', { name: 'Commercial' }));
    expect(screen.getByText('Vana Pavilions: Biophilic Tech Hub')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText('The Terraced Courtyard Residence')).not.toBeInTheDocument();
    });
  });

  it('opens and closes the project details modal', async () => {
    render(<ArchitecturePage />);
    const projectCard = screen.getByText('The Terraced Courtyard Residence');
    fireEvent.click(projectCard);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Concept & Overview')).toBeInTheDocument();

    const closeBtn = screen.getByLabelText('Close project modal');
    fireEvent.click(closeBtn);
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});
