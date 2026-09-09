import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';

if (screen && !screen.getByAlt) {
  screen.getByAlt = (...args) => screen.getByAltText(...args);
}

if (typeof window !== 'undefined' && !window.IntersectionObserver) {
  class MockIntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  window.IntersectionObserver = MockIntersectionObserver;
  global.IntersectionObserver = MockIntersectionObserver;
}
