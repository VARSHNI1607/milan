/**
 * Visual identity per category: poster ground, pattern ink, frame colour and
 * the block-print pattern used behind the jharokha (arched window) motif.
 * Colours come only from the core palette in variables.css.
 */
export const categoryStyles = {
  Dance: { bg: '#E2391B', ink: '#F5A623', frame: '#F6EEDF', text: '#F6EEDF', pattern: 'chevron' },
  Music: { bg: '#1B1446', ink: '#F5A623', frame: '#F5A623', text: '#F6EEDF', pattern: 'wave' },
  Drama: { bg: '#6E1A12', ink: '#E2391B', frame: '#F5A623', text: '#F6EEDF', pattern: 'diamond' },
  Fashion: { bg: '#E5197A', ink: '#F6EEDF', frame: '#1B1446', text: '#F6EEDF', pattern: 'buti' },
  'Creative Arts': { bg: '#F5A623', ink: '#E2391B', frame: '#1B1446', text: '#1B1446', pattern: 'kolam' },
  Literary: { bg: '#EADBC0', ink: '#1B1446', frame: '#E2391B', text: '#1B1446', pattern: 'lines' },
  Technical: { bg: '#120C33', ink: '#E5197A', frame: '#F5A623', text: '#F6EEDF', pattern: 'grid' },
};

export const fallbackStyle = categoryStyles.Literary;

export function getCategoryStyle(category) {
  return categoryStyles[category] ?? fallbackStyle;
}
