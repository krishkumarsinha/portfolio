import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Proficiency from './Proficiency';

describe('Proficiency', () => {
  it('renders the Proficiency heading', () => {
    render(<Proficiency />);
    expect(screen.getByText('Proficiency')).toBeInTheDocument();
  });

  it('renders all skill category titles', () => {
    render(<Proficiency />);
    // Category titles are rendered in the mobile grid as h3 elements
    expect(screen.getAllByText('Drafting').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('3d Modelling').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('3d Rendering').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Languages').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Soft Skills').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Documentation').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Graphics').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Others').length).toBeGreaterThanOrEqual(1);
  });

  it('renders specific skills within category descriptions', () => {
    render(<Proficiency />);
    // Skills are rendered as joined strings in the mobile grid and active desktop panel
    expect(screen.getAllByText(/AUTO CAD/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/SKETCHUP/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/D5 RENDER/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/ENGLISH/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/ANGIKA/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/COMMUNICATION/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/PHOTOGRAMMETRY/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/PHOTOSHOP/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/FIGMA/).length).toBeGreaterThanOrEqual(1);
  });

  it('renders the section with id="proficiency"', () => {
    const { container } = render(<Proficiency />);
    const section = container.querySelector('#proficiency');
    expect(section).toBeInTheDocument();
  });

  it('renders all 8 skill categories as cards in the mobile grid', () => {
    const { container } = render(<Proficiency />);
    // The mobile grid renders 8 category cards as h3 headings
    const categoryCards = container.querySelectorAll('h3');
    expect(categoryCards.length).toBeGreaterThanOrEqual(8);
  });

  it('renders languages skills including ANGIKA, ENGLISH, HINDI', () => {
    render(<Proficiency />);
    // Languages are rendered as a joined string in the mobile card
    const languageTexts = screen.getAllByText(/ANGIKA.*ENGLISH.*HINDI/);
    expect(languageTexts.length).toBeGreaterThanOrEqual(1);
  });
});
