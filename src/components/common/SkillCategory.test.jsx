import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SkillCategory from './SkillCategory';

const mockSkills = [
  { name: 'AUTO CAD', rating: 5 },
  { name: 'RAYON', rating: 2 },
];

describe('SkillCategory', () => {
  it('renders the category title', () => {
    render(<SkillCategory title="DRAFTING" skills={mockSkills} />);
    expect(screen.getByText('DRAFTING')).toBeInTheDocument();
  });

  it('renders all skills in the category', () => {
    render(<SkillCategory title="DRAFTING" skills={mockSkills} />);
    expect(screen.getByText('AUTO CAD')).toBeInTheDocument();
    expect(screen.getByText('RAYON')).toBeInTheDocument();
  });

  it('renders correct number of skill items', () => {
    const { container } = render(<SkillCategory title="DRAFTING" skills={mockSkills} />);
    const skillItems = container.querySelectorAll('[data-testid="skill-item"]');
    expect(skillItems).toHaveLength(2);
  });
});
