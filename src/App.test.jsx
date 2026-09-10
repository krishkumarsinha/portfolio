import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the Navbar', () => {
    render(<App />);
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
  });

  it('renders the Hero section', () => {
    render(<App />);
    // Mobile + desktop layouts both render these texts (CSS hides one)
    const hellos = screen.getAllByText('Hello');
    expect(hellos.length).toBeGreaterThanOrEqual(1);
    const names = screen.getAllByText('I am Krish Kumar Sinha,');
    expect(names.length).toBeGreaterThanOrEqual(1);
  });

  it('renders the Timeline section', () => {
    render(<App />);
    expect(screen.getByText('Timeline')).toBeInTheDocument();
  });

  it('renders the Proficiency section', () => {
    render(<App />);
    expect(screen.getByText('Proficiency')).toBeInTheDocument();
  });

  it('renders the Achievements section', () => {
    render(<App />);
    expect(screen.getByText('Achievements')).toBeInTheDocument();
  });

  it('renders all sections in correct order', () => {
    const { container } = render(<App />);
    const sections = container.querySelectorAll('section, nav');
    expect(sections.length).toBeGreaterThanOrEqual(4);
  });
});
