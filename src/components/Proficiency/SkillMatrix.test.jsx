import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SkillMatrix, { getSkillLevel } from './SkillMatrix';

const mockSkills = [
  { name: 'AUTO CAD', rating: 4 },
  { name: 'RAYON', rating: 2 },
];

describe('SkillMatrix', () => {
  it('renders skill names with logos and ratings', () => {
    render(<SkillMatrix skills={mockSkills} />);
    expect(screen.getByText('AUTO CAD')).toBeInTheDocument();
    expect(screen.getByText('RAYON')).toBeInTheDocument();
    expect(screen.getByText('4/5')).toBeInTheDocument();
    expect(screen.getByText('2/5')).toBeInTheDocument();
  });

  it('renders correct level tags for technical skills and languages', () => {
    expect(getSkillLevel(5, false)).toBe('Expert');
    expect(getSkillLevel(4, false)).toBe('Advanced');
    expect(getSkillLevel(3, false)).toBe('Proficient');
    expect(getSkillLevel(2, false)).toBe('Intermediate');
    expect(getSkillLevel(1, false)).toBe('Foundational');

    expect(getSkillLevel(5, true)).toBe('Native');
    expect(getSkillLevel(4, true)).toBe('Fluent');
    expect(getSkillLevel(3, true)).toBe('Professional');
    expect(getSkillLevel(2, true)).toBe('Conversational');
    expect(getSkillLevel(1, true)).toBe('Basic');
  });

  it('renders matrix dot indicators', () => {
    const { container } = render(<SkillMatrix skills={mockSkills} />);
    const filledDots = container.querySelectorAll('[data-testid~="skill-dot-filled"]');
    const unfilledDots = container.querySelectorAll('[data-testid~="skill-dot-unfilled"]');
    // 4 + 2 = 6 filled dots; 1 + 3 = 4 unfilled dots; total 10 dots
    expect(filledDots).toHaveLength(6);
    expect(unfilledDots).toHaveLength(4);
  });
});
