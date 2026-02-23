export function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export function minutesToSeconds(minutes) {
  return minutes * 60;
}

export function getModeLabel(mode) {
  switch (mode) {
    case 'work': return 'Focus';
    case 'shortBreak': return 'Short Break';
    case 'longBreak': return 'Long Break';
    default: return '';
  }
}
