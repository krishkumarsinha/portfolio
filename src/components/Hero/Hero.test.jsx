import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Hero from './Hero';

describe('Hero', () => {
  it('renders the greeting', () => {
    render(<Hero />);
    // Mobile + desktop layouts both render "Hello" (CSS hides one)
    const elements = screen.getAllByText('Hello');
    expect(elements.length).toBeGreaterThanOrEqual(1);
    expect(elements[0]).toBeInTheDocument();
  });

  it('renders the name', () => {
    render(<Hero />);
    const elements = screen.getAllByText('I am Krish Kumar Sinha,');
    expect(elements.length).toBeGreaterThanOrEqual(1);
    expect(elements[0]).toBeInTheDocument();
  });

  it('renders the institution', () => {
    render(<Hero />);
    const elements = screen.getAllByText(/National Institute of Technology Patna/);
    expect(elements.length).toBeGreaterThanOrEqual(1);
    expect(elements[0]).toBeInTheDocument();
  });

  it('renders the philosophy quote', () => {
    render(<Hero />);
    const elements = screen.getAllByText(/By balancing honest materials/);
    expect(elements.length).toBeGreaterThanOrEqual(1);
    expect(elements[0]).toBeInTheDocument();
  });

  it('renders the profile image', () => {
    render(<Hero />);
    const images = screen.getAllByAltText(/Krish Kumar Sinha/);
    expect(images.length).toBeGreaterThanOrEqual(1);
    expect(images[0].getAttribute('src')).toMatch(/\/images\/profile\.(png|jpg|webp)/);
  });

  it('renders the year and student text', () => {
    render(<Hero />);
    const elements = screen.getAllByText(/4th Year Architecture Student at/);
    expect(elements.length).toBeGreaterThanOrEqual(1);
    expect(elements[0]).toBeInTheDocument();
  });

  it('rotates to the next language greeting after 3 seconds', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    render(<Hero />);
    expect(screen.getAllByText('Hello').length).toBeGreaterThanOrEqual(1);

    await act(async () => {
      vi.advanceTimersByTime(3100);
    });
    expect(screen.getAllByText('你好').length).toBeGreaterThanOrEqual(1);

    await act(async () => {
      vi.advanceTimersByTime(3000);
    });
    expect(screen.getAllByText('नमस्ते').length).toBeGreaterThanOrEqual(1);

    vi.useRealTimers();
  });

  it('contains 50 languages in GREETINGS data with native script and fonts', async () => {
    const { GREETINGS, SCRIPT_FONTS } = await import('../../data/greetings');
    expect(GREETINGS.length).toBe(50);
    expect(GREETINGS[0].text).toBe('Hello');
    expect(GREETINGS[1].text).toBe('你好');
    expect(GREETINGS[2].text).toBe('नमस्ते');
    expect(SCRIPT_FONTS.devanagari).toContain('Noto Sans Devanagari');
    expect(SCRIPT_FONTS.chinese).toContain('Noto Sans SC');
    expect(SCRIPT_FONTS.arabic).toContain('Noto Sans Arabic');
  });
});
