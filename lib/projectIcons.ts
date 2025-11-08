/**
 * Utility to generate project icons when images are not available
 * Each icon is unique and matches the blue theme
 */

interface IconConfig {
  type: 'cube' | 'sphere' | 'cylinder' | 'diamond' | 'hexagon' | 'octagon' | 'star' | 'gear' | 'layers' | 'rocket';
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  rotation: number;
}

// Blue theme colors
const BLUE_COLORS = {
  primary: ['#3b82f6', '#2563eb', '#1d4ed8', '#1e40af'], // Blue shades
  secondary: ['#60a5fa', '#3b82f6', '#2563eb'], // Lighter blues
  accent: ['#93c5fd', '#60a5fa', '#3b82f6'], // Light blues
  dark: ['#1e3a8a', '#1e40af', '#1d4ed8'], // Dark blues
};

/**
 * Generate a unique icon configuration based on project ID or index
 */
function getIconConfig(projectId: number | string, index: number): IconConfig {
  // Use a combination of ID and index to ensure uniqueness
  const seed = typeof projectId === 'string' 
    ? projectId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    : projectId;
  const combined = (seed + index * 37) % 1000;

  const iconTypes: IconConfig['type'][] = [
    'cube', 'sphere', 'cylinder', 'diamond', 'hexagon', 
    'octagon', 'star', 'gear', 'layers', 'rocket'
  ];
  
  const type = iconTypes[combined % iconTypes.length];
  const primaryIndex = Math.floor(combined / 10) % BLUE_COLORS.primary.length;
  const secondaryIndex = Math.floor(combined / 20) % BLUE_COLORS.secondary.length;
  const accentIndex = Math.floor(combined / 30) % BLUE_COLORS.accent.length;
  const rotation = (combined % 360);

  return {
    type,
    primaryColor: BLUE_COLORS.primary[primaryIndex],
    secondaryColor: BLUE_COLORS.secondary[secondaryIndex],
    accentColor: BLUE_COLORS.accent[accentIndex],
    rotation,
  };
}

/**
 * Generate SVG icon based on configuration
 */
function generateIconSVG(config: IconConfig, size: number = 512, seed: number = 0): string {
  const center = size / 2;
  const radius = size * 0.35;
  const transform = `rotate(${config.rotation} ${center} ${center})`;
  const uniqueId = `icon-${config.type}-${seed}-${config.rotation}`;

  let shapes = '';

  switch (config.type) {
    case 'cube':
      shapes = `
        <g transform="${transform}">
          <rect x="${center - radius * 0.7}" y="${center - radius * 0.7}" 
                width="${radius * 1.4}" height="${radius * 1.4}" 
                fill="${config.primaryColor}" opacity="0.9" 
                transform="skewX(-10) rotate(45 ${center} ${center})"/>
          <rect x="${center - radius * 0.5}" y="${center - radius * 0.5}" 
                width="${radius}" height="${radius}" 
                fill="${config.secondaryColor}" opacity="0.7"
                transform="skewX(-10) rotate(45 ${center} ${center})"/>
          <rect x="${center - radius * 0.3}" y="${center - radius * 0.3}" 
                width="${radius * 0.6}" height="${radius * 0.6}" 
                fill="${config.accentColor}" opacity="0.5"
                transform="skewX(-10) rotate(45 ${center} ${center})"/>
        </g>
      `;
      break;

    case 'sphere':
      const gradientId = `grad-${uniqueId}`;
      shapes = `
        <defs>
          <radialGradient id="${gradientId}" cx="50%" cy="30%">
            <stop offset="0%" stop-color="${config.accentColor}" stop-opacity="0.9"/>
            <stop offset="50%" stop-color="${config.secondaryColor}" stop-opacity="0.8"/>
            <stop offset="100%" stop-color="${config.primaryColor}" stop-opacity="0.7"/>
          </radialGradient>
        </defs>
        <circle cx="${center}" cy="${center}" r="${radius}" 
                fill="url(#${gradientId})"/>
        <ellipse cx="${center - radius * 0.3}" cy="${center - radius * 0.4}" 
                 rx="${radius * 0.4}" ry="${radius * 0.2}" 
                 fill="${config.accentColor}" opacity="0.3"/>
      `;
      break;

    case 'cylinder':
      shapes = `
        <g transform="${transform}">
          <ellipse cx="${center}" cy="${center - radius * 0.5}" 
                   rx="${radius * 0.8}" ry="${radius * 0.2}" 
                   fill="${config.primaryColor}" opacity="0.9"/>
          <rect x="${center - radius * 0.8}" y="${center - radius * 0.5}" 
                width="${radius * 1.6}" height="${radius}" 
                fill="${config.secondaryColor}" opacity="0.7"/>
          <ellipse cx="${center}" cy="${center + radius * 0.5}" 
                   rx="${radius * 0.8}" ry="${radius * 0.2}" 
                   fill="${config.primaryColor}" opacity="0.9"/>
        </g>
      `;
      break;

    case 'diamond':
      shapes = `
        <g transform="${transform}">
          <polygon points="${center},${center - radius} ${center + radius},${center} ${center},${center + radius} ${center - radius},${center}" 
                   fill="${config.primaryColor}" opacity="0.9"/>
          <polygon points="${center},${center - radius * 0.6} ${center + radius * 0.6},${center} ${center},${center + radius * 0.6} ${center - radius * 0.6},${center}" 
                   fill="${config.secondaryColor}" opacity="0.7"/>
          <polygon points="${center},${center - radius * 0.3} ${center + radius * 0.3},${center} ${center},${center + radius * 0.3} ${center - radius * 0.3},${center}" 
                   fill="${config.accentColor}" opacity="0.5"/>
        </g>
      `;
      break;

    case 'hexagon':
      const hexPoints = Array.from({ length: 6 }, (_, i) => {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const x = center + radius * Math.cos(angle);
        const y = center + radius * Math.sin(angle);
        return `${x},${y}`;
      }).join(' ');
      shapes = `
        <g transform="${transform}">
          <polygon points="${hexPoints}" 
                   fill="${config.primaryColor}" opacity="0.9"/>
          <polygon points="${hexPoints.split(' ').map(p => {
            const [x, y] = p.split(',').map(Number);
            const cx = center + (x - center) * 0.6;
            const cy = center + (y - center) * 0.6;
            return `${cx},${cy}`;
          }).join(' ')}" 
                   fill="${config.secondaryColor}" opacity="0.7"/>
        </g>
      `;
      break;

    case 'octagon':
      const octPoints = Array.from({ length: 8 }, (_, i) => {
        const angle = (Math.PI / 4) * i - Math.PI / 8;
        const x = center + radius * Math.cos(angle);
        const y = center + radius * Math.sin(angle);
        return `${x},${y}`;
      }).join(' ');
      shapes = `
        <g transform="${transform}">
          <polygon points="${octPoints}" 
                   fill="${config.primaryColor}" opacity="0.9"/>
          <polygon points="${octPoints.split(' ').map(p => {
            const [x, y] = p.split(',').map(Number);
            const cx = center + (x - center) * 0.7;
            const cy = center + (y - center) * 0.7;
            return `${cx},${cy}`;
          }).join(' ')}" 
                   fill="${config.secondaryColor}" opacity="0.7"/>
        </g>
      `;
      break;

    case 'star':
      const starPoints = Array.from({ length: 10 }, (_, i) => {
        const angle = (Math.PI / 5) * i - Math.PI / 2;
        const r = i % 2 === 0 ? radius : radius * 0.5;
        const x = center + r * Math.cos(angle);
        const y = center + r * Math.sin(angle);
        return `${x},${y}`;
      }).join(' ');
      shapes = `
        <g transform="${transform}">
          <polygon points="${starPoints}" 
                   fill="${config.primaryColor}" opacity="0.9"/>
          <circle cx="${center}" cy="${center}" r="${radius * 0.3}" 
                  fill="${config.accentColor}" opacity="0.6"/>
        </g>
      `;
      break;

    case 'gear':
      const gearTeeth = 12;
      const gearPoints: string[] = [];
      for (let i = 0; i < gearTeeth * 2; i++) {
        const angle = (Math.PI / gearTeeth) * i;
        const r = i % 2 === 0 ? radius : radius * 0.7;
        const x = center + r * Math.cos(angle);
        const y = center + r * Math.sin(angle);
        gearPoints.push(`${x},${y}`);
      }
      shapes = `
        <g transform="${transform}">
          <polygon points="${gearPoints.join(' ')}" 
                   fill="${config.primaryColor}" opacity="0.9"/>
          <circle cx="${center}" cy="${center}" r="${radius * 0.4}" 
                  fill="${config.secondaryColor}" opacity="0.8"/>
          <circle cx="${center}" cy="${center}" r="${radius * 0.25}" 
                  fill="${config.accentColor}" opacity="0.6"/>
        </g>
      `;
      break;

    case 'layers':
      shapes = `
        <g transform="${transform}">
          <rect x="${center - radius * 0.9}" y="${center - radius * 0.3}" 
                width="${radius * 1.8}" height="${radius * 0.6}" 
                rx="${radius * 0.1}" 
                fill="${config.primaryColor}" opacity="0.9"/>
          <rect x="${center - radius * 0.7}" y="${center - radius * 0.1}" 
                width="${radius * 1.4}" height="${radius * 0.6}" 
                rx="${radius * 0.1}" 
                fill="${config.secondaryColor}" opacity="0.8"/>
          <rect x="${center - radius * 0.5}" y="${center + radius * 0.1}" 
                width="${radius}" height="${radius * 0.6}" 
                rx="${radius * 0.1}" 
                fill="${config.accentColor}" opacity="0.7"/>
        </g>
      `;
      break;

    case 'rocket':
      shapes = `
        <g transform="${transform}">
          <path d="M ${center} ${center - radius} 
                   L ${center - radius * 0.3} ${center + radius * 0.2} 
                   L ${center} ${center + radius * 0.1} 
                   L ${center + radius * 0.3} ${center + radius * 0.2} Z" 
                fill="${config.primaryColor}" opacity="0.9"/>
          <circle cx="${center}" cy="${center - radius * 0.2}" r="${radius * 0.15}" 
                  fill="${config.accentColor}" opacity="0.8"/>
          <polygon points="${center - radius * 0.3},${center + radius * 0.2} ${center - radius * 0.5},${center + radius * 0.5} ${center},${center + radius * 0.3}" 
                   fill="${config.secondaryColor}" opacity="0.7"/>
          <polygon points="${center + radius * 0.3},${center + radius * 0.2} ${center + radius * 0.5},${center + radius * 0.5} ${center},${center + radius * 0.3}" 
                   fill="${config.secondaryColor}" opacity="0.7"/>
        </g>
      `;
      break;

    default:
      shapes = `<circle cx="${center}" cy="${center}" r="${radius}" fill="${config.primaryColor}" opacity="0.9"/>`;
  }

  return `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#0f172a"/>
      ${shapes}
    </svg>
  `.trim();
}

/**
 * Generate a data URL for a project icon
 */
export function generateProjectIcon(projectId: number | string, index: number): string {
  const config = getIconConfig(projectId, index);
  // Use a combination of ID and index as seed for unique IDs
  const seed = typeof projectId === 'string' 
    ? projectId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + index
    : projectId + index;
  const svg = generateIconSVG(config, 512, seed);
  // Properly encode SVG for data URL (encodeURIComponent handles special characters)
  const encoded = encodeURIComponent(svg).replace(/'/g, '%27').replace(/"/g, '%22');
  return `data:image/svg+xml;charset=utf-8,${encoded}`;
}

