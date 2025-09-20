
/**
 * Calculates the contrasting text color (black or white) for a given background hex color.
 * @param hex - The hex color string (e.g., "#RRGGBB").
 * @returns "#000000" (black) or "#FFFFFF" (white).
 */
export const getContrastingTextColor = (hex: string): string => {
  if (!hex) return '#000000';

  // Remove the hash at the start if it's there
  const sanitizedHex = hex.startsWith('#') ? hex.slice(1) : hex;

  // If the hex is short (e.g. #FFF), expand it.
  const fullHex = sanitizedHex.length === 3 
    ? sanitizedHex.split('').map(char => char + char).join('') 
    : sanitizedHex;

  if (fullHex.length !== 6) {
    return '#000000'; // Return black for invalid hex
  }

  // Convert hex to RGB
  const r = parseInt(fullHex.substring(0, 2), 16);
  const g = parseInt(fullHex.substring(2, 4), 16);
  const b = parseInt(fullHex.substring(4, 6), 16);

  // Calculate luminance using the WCAG formula
  // https://www.w3.org/TR/WCAG20/#relativeluminancedef
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return black for light colors, white for dark colors
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};
