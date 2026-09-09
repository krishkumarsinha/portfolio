import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Hero from './Hero';

describe('Hero', () => {
  it('renders the greeting', () => {
    render(<Hero />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('renders the name', () => {
    render(<Hero />);
    expect(screen.getByText('I am Krish Kumar Sinha,')).toBeInTheDocument();
  });

  it('renders the institution', () => {
    render(<Hero />);
    expect(screen.getByText(/National Institute of Technology Patna/)).toBeInTheDocument();
  });

  it('renders the philosophy quote', () => {
    render(<Hero />);
    expect(screen.getByText(/By balancing honest materials/)).toBeInTheDocument();
  });

  it('renders the profile image', () => {
    render(<Hero />);
    const img = screen.getByAltText('Krish Kumar Sinha');
    expect(img).toBeInTheDocument();
    expect(img.getAttribute('src')).toMatch(/\/images\/profile\.(png|jpg)/);
  });

  it('renders the year and student text', () => {
    render(<Hero />);
    expect(screen.getByText(/4th Year Architecture Student at/)).toBeInTheDocument();
  });
});
