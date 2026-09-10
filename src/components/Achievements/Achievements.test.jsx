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

  it('renders institute experience category and entries', () => {
    render(<Achievements />);
    expect(screen.getByText('INSTITUTE EXPERIENCE')).toBeInTheDocument();
    expect(screen.getAllByText('Expresso (Literature & Art Club)').length).toBeGreaterThan(0);
    expect(screen.getByText('Tatva 26')).toBeInTheDocument();
  });

  it('renders competitions category and entries', () => {
    render(<Achievements />);
    expect(screen.getByText('COMPETITIONS')).toBeInTheDocument();
    expect(screen.getByText('ANDC (Annual NASA Design Competition)')).toBeInTheDocument();
    expect(screen.getByText('Reubeens Trophy')).toBeInTheDocument();
  });

  it('renders the architecture quote similar to timeline', () => {
    render(<Achievements />);
    expect(screen.getByText('"Architecture is the thoughtful making of spaces"')).toBeInTheDocument();
    expect(screen.getByText('~ Louis I. Kahn')).toBeInTheDocument();
  });

  it('renders 6 hobbies horizontally with equal spacing from left to right', () => {
    const { container } = render(<Achievements />);
    const hobbyItems = container.querySelectorAll('[data-testid="hobby-item"]');
    expect(hobbyItems.length).toBe(6);
    expect(screen.getByText('PHOTOGRAPHY')).toBeInTheDocument();
    expect(screen.getByText('VIDEOGRAPHY')).toBeInTheDocument();
    expect(screen.getByText('POST PRODUCTION')).toBeInTheDocument();
    expect(screen.getByText('GRAPHIC DESIGN')).toBeInTheDocument();
    expect(screen.getByText('MUSIC')).toBeInTheDocument();
    expect(screen.getByText('POETRY')).toBeInTheDocument();
  });

  it('renders the bottom tab matching hero page tab width and styling', () => {
    const { container } = render(<Achievements />);
    const bottomTab = container.querySelector('[data-testid="achievements-bottom-tab"]');
    expect(bottomTab).toBeInTheDocument();
    expect(bottomTab).toHaveClass('w-full', 'bg-[#c5c5c5]');
  });
});
