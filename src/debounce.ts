  import { Debounced } from './type';
// utils/debounce.ts

 
/**
 * 延迟 fn 执行；若在 wait 内重复调用则重置计时。
 * @param fn  原函数
 * @param wait 毫秒
 * @param immediate 第一次是否立即执行
 */
export function debounce<F extends (...args: any[]) => void>(
  fn: F,
  wait = 300,
  immediate = false,
): Debounced<F> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let invoked = false;
  const wrapper = (...args: Parameters<F>) => {
    if (immediate && !invoked) {
      fn(...args);
      invoked = true;
      setTimeout(() => {
        invoked = false;
      }, wait);
      return;
    }
    if (timer !== undefined) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
      timer = undefined;
    }, wait);
  };
  return wrapper as Debounced<F>;
}
