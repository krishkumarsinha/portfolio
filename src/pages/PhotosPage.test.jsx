import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PhotosPage from './PhotosPage';

describe('PhotosPage', () => {
  it('renders heading and overview back button', () => {
    const handleBack = vi.fn();
    render(<PhotosPage onBack={handleBack} />);
    expect(screen.getByRole('heading', { level: 1, name: 'Photos' })).toBeInTheDocument();
    
    const backBtn = screen.getByRole('button', { name: /overview/i });
    expect(backBtn).toBeInTheDocument();
    fireEvent.click(backBtn);
    expect(handleBack).toHaveBeenCalledTimes(1);
  });

  it('renders the minimal and creative hero collage with 5 frames', () => {
    render(<PhotosPage />);
    const collage = screen.getByTestId('hero-collage');
    expect(collage).toBeInTheDocument();

    const collageItems = screen.getAllByTestId('hero-collage-item');
    expect(collageItems.length).toBe(5);
    expect(screen.getByText('Light, Shadow & Constructed Forms')).toBeInTheDocument();
  });

  it('renders photo cards and filters by category', async () => {
    render(<PhotosPage />);
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Monoliths' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'River & Mist' })).toBeInTheDocument();

    const initialCards = screen.getAllByTestId('photo-card');
    expect(initialCards.length).toBe(20);

    fireEvent.click(screen.getByRole('button', { name: 'Monoliths' }));
    
    // Wait for exit animation to remove filtered cards
    await waitFor(() => {
      const filteredCards = screen.getAllByTestId('photo-card');
      expect(filteredCards.length).toBe(5);
      expect(within(filteredCards[0]).getByText('Radial Mast & Altocumulus')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: 'River & Mist' }));
    await waitFor(() => {
      const riverCards = screen.getAllByTestId('photo-card');
      expect(riverCards.length).toBe(6);
      expect(within(riverCards[0]).getByText('Ganga in Morning Mist')).toBeInTheDocument();
    });
  });

  it('opens and closes the full-screen photo lightbox from gallery card', async () => {
    render(<PhotosPage />);
    const cards = screen.getAllByTestId('photo-card');
    fireEvent.click(cards[0]);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Patna, Bihar • 2024')).toBeInTheDocument();

    const closeBtn = screen.getByLabelText('Close photo preview');
    fireEvent.click(closeBtn);
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('opens full-screen photo lightbox when clicking a hero collage item', async () => {
    render(<PhotosPage />);
    const collageItems = screen.getAllByTestId('hero-collage-item');
    fireEvent.click(collageItems[0]);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    const closeBtn = screen.getByLabelText('Close photo preview');
    fireEvent.click(closeBtn);
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});
