export function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export function minutesToSeconds(minutes: number): number {
  return minutes * 60;
}

export function getModeLabel(mode: string): string {
  switch (mode) {
    case 'work': return 'Focus';
    case 'shortBreak': return 'Short Break';
    case 'longBreak': return 'Long Break';
    default: return '';
  }
}
