import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Proficiency from './Proficiency';

describe('Proficiency', () => {
  it('renders the Proficiency heading', () => {
    render(<Proficiency />);
    expect(screen.getByText('Proficiency')).toBeInTheDocument();
  });

  it('renders all skill categories across two columns', () => {
    render(<Proficiency />);
    expect(screen.getByText('DRAFTING')).toBeInTheDocument();
    expect(screen.getByText('3D MODELLING')).toBeInTheDocument();
    expect(screen.getByText('3D RENDERING')).toBeInTheDocument();
    expect(screen.getByText('LANGUAGES')).toBeInTheDocument();
    expect(screen.getByText('SOFT SKILLS')).toBeInTheDocument();
    expect(screen.getByText('DOCUMENTATION')).toBeInTheDocument();
    expect(screen.getByText('GRAPHICS')).toBeInTheDocument();
    expect(screen.getByText('OTHERS')).toBeInTheDocument();
  });

  it('renders specific skills', () => {
    render(<Proficiency />);
    expect(screen.getByText('AUTO CAD')).toBeInTheDocument();
    expect(screen.getByText('SKETCHUP')).toBeInTheDocument();
    expect(screen.getByText('D5 RENDER')).toBeInTheDocument();
    expect(screen.getByText('ENGLISH')).toBeInTheDocument();
    expect(screen.getByText('ANGIKA')).toBeInTheDocument();
    expect(screen.getByText('COMMUNICATION')).toBeInTheDocument();
    expect(screen.getByText('PHOTOGRAMMETRY')).toBeInTheDocument();
    expect(screen.getByText('PHOTOSHOP')).toBeInTheDocument();
    expect(screen.getByText('FIGMA')).toBeInTheDocument();
  });

  it('renders the section with id="proficiency"', () => {
    const { container } = render(<Proficiency />);
    const section = container.querySelector('#proficiency');
    expect(section).toBeInTheDocument();
  });

  it('renders all 8 groups in 4 row-by-row aligned pairs', () => {
    const { container } = render(<Proficiency />);
    const rows = container.querySelectorAll('.grid.grid-cols-1.md\\:grid-cols-2');
    expect(rows.length).toBe(4); // 4 pairs of rows
    expect(screen.getByText('LANGUAGES')).toBeInTheDocument();
    expect(screen.getByText('SOFT SKILLS')).toBeInTheDocument();
  });

  it('renders languages in the requested order: ANGIKA, ENGLISH, HINDI', () => {
    render(<Proficiency />);
    const angika = screen.getByText('ANGIKA');
    const english = screen.getByText('ENGLISH');
    const hindi = screen.getByText('HINDI');
    expect(angika.compareDocumentPosition(english) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(english.compareDocumentPosition(hindi) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});
