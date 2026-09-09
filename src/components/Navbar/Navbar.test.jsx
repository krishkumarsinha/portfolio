import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('renders the Portfolio logo', () => {
    render(<Navbar />);
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Navbar />);
    expect(screen.getByText('Architecture')).toBeInTheDocument();
    expect(screen.getByText('Photos')).toBeInTheDocument();
    expect(screen.getByText('Design')).toBeInTheDocument();
  });

  it('has correct href attributes for smooth scrolling', () => {
    render(<Navbar />);
    expect(screen.getByText('Architecture').closest('a')).toHaveAttribute('href', '#architecture');
    expect(screen.getByText('Photos').closest('a')).toHaveAttribute('href', '#photos');
    expect(screen.getByText('Design').closest('a')).toHaveAttribute('href', '#design');
  });
});
