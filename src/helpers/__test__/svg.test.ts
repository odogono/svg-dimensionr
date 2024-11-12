import { beforeEach, describe, expect, test } from 'bun:test';

import { centerSvgGeometry } from '../svg';

describe('centerSvgGeometry', () => {
  test('should center SVG geometry', () => {
    const inputSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="50">
        <path d="M0,0C0,0,10,10,10,10"/>
        <path d="M0,0C0,0,20,0,20,0C20,0,20,10,20,10C20,10,0,10,0,10C0,10,0,0,0,0C0,0,0,0,0,0"/>
      </svg>
    `;

    const result = centerSvgGeometry(inputSvg);

    // The paths should be centered around 0,0
    expect(result).toContain('M-10,-5'); // First point of first path
    expect(result).toContain('M-10,-5C-10,-5,0,5,0,5'); // First path centered
    expect(result).toContain(
      'M-10,-5C-10,-5,10,-5,10,-5C10,-5,10,5,10,5C10,5,-10,5,-10,5C-10,5,-10,-5,-10,-5'
    ); // Second path centered
  });
});
