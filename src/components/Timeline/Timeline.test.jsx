import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Timeline from './Timeline';

describe('Timeline', () => {
  it('renders the Timeline heading', () => {
    render(<Timeline />);
    expect(screen.getByText('Timeline')).toBeInTheDocument();
  });

  it('renders education entries', () => {
    render(<Timeline />);
    expect(screen.getByText('Secondary Education')).toBeInTheDocument();
    expect(screen.getByText(/St. Mary/)).toBeInTheDocument();
    expect(screen.getByText('Higher Secondary Education')).toBeInTheDocument();
    expect(screen.getByText(/Anugrah Narayan Singh/)).toBeInTheDocument();
    expect(screen.getByText('Bachelor of Architecture')).toBeInTheDocument();
  });

  it('renders experience entries', () => {
    render(<Timeline />);
    expect(screen.getByText('Design and Marketing Intern')).toBeInTheDocument();
    expect(screen.getByText(/Astomverse/)).toBeInTheDocument();
    expect(screen.getByText(/Creative Designers Patna/)).toBeInTheDocument();
    expect(screen.getByText(/Dokotsa Infra/)).toBeInTheDocument();
    expect(screen.getByText(/Design Associates INC/)).toBeInTheDocument();
  });

  it('renders education periods', () => {
    render(<Timeline />);
    expect(screen.getByText('2012-2023')).toBeInTheDocument();
    expect(screen.getByText('2023-2028')).toBeInTheDocument();
  });

  it('renders experience years', () => {
    render(<Timeline />);
    expect(screen.getByText('2023', { selector: '[data-testid="experience-year"]' })).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
    expect(screen.getByText('2025')).toBeInTheDocument();
    expect(screen.getByText('2026')).toBeInTheDocument();
  });

  it('renders the Tolkien quote', () => {
    render(<Timeline />);
    expect(screen.getByText(/Not all those who wander are lost/)).toBeInTheDocument();
    expect(screen.getByText(/J.R.R. Tolkien/)).toBeInTheDocument();
  });
});
