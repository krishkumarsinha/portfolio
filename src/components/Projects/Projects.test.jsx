import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Projects from './Projects';

describe('Projects (Architecture)', () => {
  it('renders the Architecture heading and section id', () => {
    const { container } = render(<Projects />);
    expect(screen.getByText('Architecture')).toBeInTheDocument();
    expect(container.querySelector('#architecture')).toBeInTheDocument();
  });

  it('renders category filter buttons', () => {
    render(<Projects />);
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Residential' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Commercial' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Interior' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Conceptual' })).toBeInTheDocument();
  });

  it('renders project cards', () => {
    render(<Projects />);
    const cards = screen.getAllByTestId('project-card');
    expect(cards.length).toBe(6);
    expect(screen.getByText('The Terraced Courtyard Residence')).toBeInTheDocument();
  });

  it('filters projects when a category is clicked', async () => {
    render(<Projects />);
    fireEvent.click(screen.getByRole('button', { name: 'Commercial' }));
    expect(screen.getByText('Vana Pavilions: Biophilic Tech Hub')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText('The Terraced Courtyard Residence')).not.toBeInTheDocument();
    });
  });

  it('opens and closes project detail modal', async () => {
    render(<Projects />);
    const projectTitle = screen.getByText('The Terraced Courtyard Residence');
    fireEvent.click(projectTitle);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Concept & Overview')).toBeInTheDocument();

    const closeBtn = screen.getByLabelText('Close project modal');
    fireEvent.click(closeBtn);
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});
