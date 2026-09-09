export const skillCategories = [
  {
    title: 'DRAFTING',
    skills: [
      { name: 'AUTO CAD', rating: 4 },
      { name: 'RAYON', rating: 2 },
    ],
  },
  {
    title: '3D MODELLING',
    skills: [
      { name: 'SKETCHUP', rating: 4 },
      { name: 'REVIT', rating: 3 },
      { name: 'ARCHICAD', rating: 2 },
    ],
  },
  {
    title: 'DOCUMENTATION',
    skills: [
      { name: 'PHOTOGRAMMETRY', rating: 4 },
      { name: 'PHYSICAL MODELLING', rating: 3 },
      { name: 'LAZER CUTTING', rating: 2 },
    ],
  },
  {
    title: 'GRAPHICS',
    skills: [
      { name: 'PHOTOSHOP', rating: 5 },
      { name: 'ILLUSTRATOR', rating: 3 },
      { name: 'INDESIGN', rating: 2 },
      { name: 'LIGHTROOM', rating: 4 },
    ],
  },
  {
    title: '3D RENDERING',
    skills: [
      { name: 'D5 RENDER', rating: 4 },
      { name: 'LUMION', rating: 3 },
      { name: 'ENSCAPE', rating: 2 },
      { name: 'TWINMOTION', rating: 3 },
    ],
  },
  {
    title: 'OTHERS',
    skills: [
      { name: 'AI PROMPT RENDERING', rating: 4 },
      { name: 'FIGMA', rating: 3 },
      { name: 'CANVA', rating: 2 },
      { name: 'AI WEB DEVLOPMENT', rating: 3 },
    ],
  },
];

// Two columns with all 6 categories, spaced with consistent gap
export const column1Categories = [
  skillCategories[0], // DRAFTING
  skillCategories[1], // 3D MODELLING
  skillCategories[4], // 3D RENDERING
];

export const column2Categories = [
  skillCategories[2], // DOCUMENTATION
  skillCategories[3], // GRAPHICS
  skillCategories[5], // OTHERS
];

// Backwards compatibility aliases
export const proficiencyLeftCategories = column1Categories;
export const proficiencyRightCategories = column2Categories;
export const achievementsSkillsCategories = skillCategories.slice(4, 6);

