export function parseFileSize(sizeStr: string): number {
  const match = sizeStr.match(/^(\d+(?:\.\d+)?)\s*(kb|mb|b)$/i);
  if (!match) return 0;
  const value = parseFloat(match[1]);
  const unit = match[2].toLowerCase();
  switch (unit) {
    case 'mb':
      return value * 1024 * 1024;
    case 'kb':
      return value * 1024;
    case 'b':
      return value;
    default:
      return 0;
  }
}
