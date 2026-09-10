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
  {
    title: 'LANGUAGES',
    skills: [
      { name: 'ANGIKA', rating: 4 },
      { name: 'ENGLISH', rating: 3 },
      { name: 'HINDI', rating: 5 },
    ],
  },
  {
    title: 'SOFT SKILLS',
    skills: [
      { name: 'COMMUNICATION', rating: 5 },
      { name: 'TEAM LEADERSHIP', rating: 4 },
      { name: 'PROBLEM SOLVING', rating: 4 },
    ],
  },
];

// Pairs of categories for row-by-row horizontal alignment
export const skillPairs = [
  { left: skillCategories[0], right: skillCategories[2] }, // Row 1: DRAFTING & DOCUMENTATION
  { left: skillCategories[1], right: skillCategories[3] }, // Row 2: 3D MODELLING & GRAPHICS
  { left: skillCategories[4], right: skillCategories[5] }, // Row 3: 3D RENDERING & OTHERS
  { left: skillCategories[6], right: skillCategories[7] }, // Row 4: LANGUAGES & SOFT SKILLS
];

// Backwards compatibility reference
export const languagesCategory = skillCategories[6]; // LANGUAGES
export const softSkillsCategory = skillCategories[7]; // SOFT SKILLS

// Two columns with all categories, spaced with consistent gap
export const column1Categories = [
  skillCategories[0], // DRAFTING
  skillCategories[1], // 3D MODELLING
  skillCategories[4], // 3D RENDERING
  skillCategories[6], // LANGUAGES
];

export const column2Categories = [
  skillCategories[2], // DOCUMENTATION
  skillCategories[3], // GRAPHICS
  skillCategories[5], // OTHERS
  skillCategories[7], // SOFT SKILLS
];

// Backwards compatibility aliases
export const proficiencyLeftCategories = column1Categories;
export const proficiencyRightCategories = column2Categories;
export const achievementsSkillsCategories = skillCategories.slice(4, 6);


