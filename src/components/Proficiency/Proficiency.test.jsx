import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Proficiency from './Proficiency';

describe('Proficiency', () => {
  it('renders the Proficiency heading', () => {
    render(<Proficiency />);
    expect(screen.getByText('Proficiency')).toBeInTheDocument();
  });

  it('renders all 6 skill categories across two columns', () => {
    render(<Proficiency />);
    expect(screen.getByText('DRAFTING')).toBeInTheDocument();
    expect(screen.getByText('3D MODELLING')).toBeInTheDocument();
    expect(screen.getByText('3D RENDERING')).toBeInTheDocument();
    expect(screen.getByText('DOCUMENTATION')).toBeInTheDocument();
    expect(screen.getByText('GRAPHICS')).toBeInTheDocument();
    expect(screen.getByText('OTHERS')).toBeInTheDocument();
  });

  it('renders specific skills', () => {
    render(<Proficiency />);
    expect(screen.getByText('AUTO CAD')).toBeInTheDocument();
    expect(screen.getByText('SKETCHUP')).toBeInTheDocument();
    expect(screen.getByText('D5 RENDER')).toBeInTheDocument();
    expect(screen.getByText('PHOTOGRAMMETRY')).toBeInTheDocument();
    expect(screen.getByText('PHOTOSHOP')).toBeInTheDocument();
    expect(screen.getByText('FIGMA')).toBeInTheDocument();
  });

  it('renders the section with id="proficiency"', () => {
    const { container } = render(<Proficiency />);
    const section = container.querySelector('#proficiency');
    expect(section).toBeInTheDocument();
  });
});
