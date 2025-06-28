
export const getSkillIcon = (skillName: string) => {
  const skill = skillName.toLowerCase();
  
  // Programming Languages
  if (skill.includes('javascript') || skill.includes('js')) return '🟨';
  if (skill.includes('python')) return '🐍';
  if (skill.includes('java')) return '☕';
  if (skill.includes('react')) return '⚛️';
  if (skill.includes('vue')) return '💚';
  if (skill.includes('angular')) return '🅰️';
  if (skill.includes('node')) return '🟢';
  if (skill.includes('php')) return '🐘';
  if (skill.includes('c++') || skill.includes('cpp')) return '⚡';
  if (skill.includes('c#') || skill.includes('csharp')) return '🔷';
  if (skill.includes('swift')) return '🦉';
  if (skill.includes('kotlin')) return '🎯';
  if (skill.includes('go') || skill.includes('golang')) return '🐹';
  if (skill.includes('rust')) return '🦀';
  if (skill.includes('typescript') || skill.includes('ts')) return '🔷';
  
  // Web Technologies
  if (skill.includes('html')) return '🌐';
  if (skill.includes('css')) return '🎨';
  if (skill.includes('sass') || skill.includes('scss')) return '💗';
  if (skill.includes('tailwind')) return '🌊';
  if (skill.includes('bootstrap')) return '🅱️';
  
  // Databases
  if (skill.includes('mysql')) return '🐬';
  if (skill.includes('postgresql') || skill.includes('postgres')) return '🐘';
  if (skill.includes('mongodb')) return '🍃';
  if (skill.includes('redis')) return '🔴';
  if (skill.includes('sqlite')) return '💾';
  
  // Design Tools
  if (skill.includes('photoshop')) return '🎨';
  if (skill.includes('illustrator')) return '🖌️';
  if (skill.includes('figma')) return '🎯';
  if (skill.includes('sketch')) return '💎';
  if (skill.includes('xd') || skill.includes('adobe xd')) return '🎨';
  if (skill.includes('canva')) return '🎨';
  
  // Development Tools
  if (skill.includes('git')) return '📝';
  if (skill.includes('docker')) return '🐳';
  if (skill.includes('kubernetes')) return '☸️';
  if (skill.includes('aws')) return '☁️';
  if (skill.includes('azure')) return '🔵';
  if (skill.includes('gcp') || skill.includes('google cloud')) return '☁️';
  if (skill.includes('firebase')) return '🔥';
  if (skill.includes('jenkins')) return '🔧';
  if (skill.includes('webpack')) return '📦';
  if (skill.includes('vite')) return '⚡';
  
  // Mobile Development
  if (skill.includes('android')) return '🤖';
  if (skill.includes('ios')) return '📱';
  if (skill.includes('flutter')) return '🦋';
  if (skill.includes('react native')) return '📱';
  
  // Default icons based on category
  if (skill.includes('leadership') || skill.includes('management')) return '👑';
  if (skill.includes('communication')) return '💬';
  if (skill.includes('teamwork') || skill.includes('collaboration')) return '🤝';
  if (skill.includes('creativity') || skill.includes('creative')) return '💡';
  if (skill.includes('problem') || skill.includes('solving')) return '🧩';
  if (skill.includes('time') || skill.includes('management')) return '⏰';
  if (skill.includes('adaptability') || skill.includes('flexible')) return '🔄';
  if (skill.includes('attention') || skill.includes('detail')) return '🔍';
  if (skill.includes('work ethic') || skill.includes('dedication')) return '💪';
  if (skill.includes('interpersonal')) return '👥';
  
  // Default fallback
  return '⚡';
};