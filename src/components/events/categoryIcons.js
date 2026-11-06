import { Footprints, Music2, Drama, Shirt, Palette, BookOpen, Cpu, Sparkles } from 'lucide-react';

export const categoryIcons = {
  Dance: Footprints,
  Music: Music2,
  Drama,
  Fashion: Shirt,
  'Creative Arts': Palette,
  Literary: BookOpen,
  Technical: Cpu,
};

export function getCategoryIcon(category) {
  return categoryIcons[category] ?? Sparkles;
}
