export function splitByBlankLine(src: string): string[] {
  const result: string[] = [];
  let buffer: string[] = [];
 
  for (const line of src.split(/\r?\n/)) {
    if (line.trim() === '') {
      // TODO: 续写，将 buffer 推入结果并重置
      