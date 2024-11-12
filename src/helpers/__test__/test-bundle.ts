import * as svgHelpers from '../svg';

// Make the functions available globally
declare global {
  interface Window {
    svgHelpers: typeof svgHelpers;
  }
}

window.svgHelpers = svgHelpers;
