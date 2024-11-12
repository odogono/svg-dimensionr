import flatten from './flatten';

// export const optimizeSvg = async (svg: string) => {
//   const result = optimize(svg, {
//     path: 'path-to.svg', // recommended
//     multipass: true // all other config fields are available here
//   });

//   return result.data;
// };

interface SVGBounds {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  width: number;
  height: number;
}

export const testHello = () => 'hello svg';

export const flattenSvg = (svgElement: SVGSVGElement): SVGSVGElement => {
  flatten(svgElement, true);

  return svgElement;
  // return new XMLSerializer().serializeToString(svgElement);
};

/**
 * Centers SVG geometry around the origin (0,0)
 * @param svgString The input SVG string
 * @returns The SVG string with centered geometry
 */
export const centerSvgGeometry = (svgElement: SVGSVGElement): SVGSVGElement => {
  // Parse the SVG string into a DOM document
  // const parser = new DOMParser();
  // const doc = parser.parseFromString(svgString, 'image/svg+xml');

  // Find all path elements
  const paths = svgElement.getElementsByTagName('path');

  // Calculate bounds of all paths
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  // Helper to extract numbers from path commands
  const getNumbers = (d: string) =>
    d.match(/-?\d+(\.\d+)?/g)?.map(Number) || [];

  // Find bounds
  Array.from(paths).forEach(path => {
    const numbers = getNumbers(path.getAttribute('d') || '');
    for (let i = 0; i < numbers.length; i += 2) {
      const x = numbers[i];
      const y = numbers[i + 1];
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  });

  // Calculate center offset
  const centerX = (maxX + minX) / 2;
  const centerY = (maxY + minY) / 2;

  // Transform all paths
  Array.from(paths).forEach(path => {
    const d = path.getAttribute('d') || '';
    const numbers = getNumbers(d);
    let newD = d;

    for (let i = 0; i < numbers.length; i += 2) {
      const x = numbers[i];
      const y = numbers[i + 1];
      const newX = x - centerX;
      const newY = y - centerY;
      newD = newD.replace(`${x},${y}`, `${newX},${newY}`);
    }

    path.setAttribute('d', newD);
  });

  return svgElement;
};

// Helper function to parse path data and get bounds
export const getSvgPathBounds = (pathData: string): SVGBounds => {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  // Create a temporary SVG path element to use the browser's path parsing
  const tempSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const tempPath = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'path'
  );
  tempPath.setAttribute('d', pathData);
  tempSvg.appendChild(tempPath);
  document.body.appendChild(tempSvg);

  // Get the bounding box
  const bbox = tempPath.getBBox();

  // Clean up
  document.body.removeChild(tempSvg);

  minX = bbox.x;
  minY = bbox.y;
  maxX = bbox.x + bbox.width;
  maxY = bbox.y + bbox.height;

  return {
    minX,
    minY,
    maxX,
    maxY,
    width: maxX - minX,
    height: maxY - minY
  };
};
