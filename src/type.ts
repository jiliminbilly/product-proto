export interface Debounced<F extends (...args: any[]) => void> {
  (...args: Parameters<F>): void;
  cancel(): void;
}