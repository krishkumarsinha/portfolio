import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Achievements from './Achievements';

describe('Achievements', () => {
  it('renders the Achievements heading', () => {
    render(<Achievements />);
    expect(screen.getByText('Achievements')).toBeInTheDocument();
  });

  it('renders the section with correct id', () => {
    const { container } = render(<Achievements />);
    const section = container.querySelector('#achievements');
    expect(section).toBeInTheDocument();
  });

  it('renders placeholder text', () => {
    render(<Achievements />);
    expect(screen.getByText(/Coming soon/i)).toBeInTheDocument();
  });
});
