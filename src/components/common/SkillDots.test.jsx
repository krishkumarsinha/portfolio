import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SkillDots from './SkillDots';

describe('SkillDots', () => {
  it('renders the skill name', () => {
    render(<SkillDots name="AUTO CAD" rating={5} />);
    expect(screen.getByText('AUTO CAD')).toBeInTheDocument();
  });

  it('renders 5 dots total by default', () => {
    const { container } = render(<SkillDots name="REVIT" rating={3} />);
    const filledDots = container.querySelectorAll('[data-testid="skill-dot-filled"]');
    const unfilledDots = container.querySelectorAll('[data-testid="skill-dot-unfilled"]');
    expect(filledDots.length + unfilledDots.length).toBe(5);
  });

  it('renders correct number of filled dots', () => {
    const { container } = render(<SkillDots name="REVIT" rating={3} />);
    const filledDots = container.querySelectorAll('[data-testid="skill-dot-filled"]');
    const unfilledDots = container.querySelectorAll('[data-testid="skill-dot-unfilled"]');
    expect(filledDots).toHaveLength(3);
    expect(unfilledDots).toHaveLength(2);
  });

  it('renders all dots filled for rating 5', () => {
    const { container } = render(<SkillDots name="AUTO CAD" rating={5} />);
    const filledDots = container.querySelectorAll('[data-testid="skill-dot-filled"]');
    expect(filledDots).toHaveLength(5);
  });

  it('renders custom total dots', () => {
    const { container } = render(<SkillDots name="TEST" rating={2} total={4} />);
    const filledDots = container.querySelectorAll('[data-testid="skill-dot-filled"]');
    const unfilledDots = container.querySelectorAll('[data-testid="skill-dot-unfilled"]');
    expect(filledDots.length + unfilledDots.length).toBe(4);
  });
});
