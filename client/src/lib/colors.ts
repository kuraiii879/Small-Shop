// Color name to hex mapping for visual swatches
export const colorMap: Record<string, string> = {
  'Black': '#000000',
  'White': '#FFFFFF',
  'Gray': '#808080',
  'Grey': '#808080',
  'Navy': '#000080',
  'Blue': '#0000FF',
  'Green': '#008000',
  'Red': '#FF0000',
  'Pink': '#FFC0CB',
  'Yellow': '#FFFF00',
  'Orange': '#FFA500',
  'Purple': '#800080',
  'Brown': '#A52A2A',
  'Beige': '#F5F5DC',
  'Khaki': '#C3B091',
  'Olive': '#808000',
  'Maroon': '#800000',
  'Burgundy': '#800020',
  'Cream': '#FFFDD0',
  'Tan': '#D2B48C',
  'Camel': '#C19A6B',
};

export const getColorHex = (colorName: string): string => {
  return colorMap[colorName] || '#CCCCCC';
};

