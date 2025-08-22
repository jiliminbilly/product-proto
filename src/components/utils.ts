import { CATEGORY_SPEC, DEFAULT_CAT1, DEFAULT_CAT2 } from './constants';
import { CatalogItem, ProductGroup, ItemRow } from './types';

/**
 * 根据物料名称做关键词归类（命中第一条即归类）
 */
export function classifyByName(name: string): { cat1: string; cat2: string } {
  for (const [cat1, subs] of Object.entries(CATEGORY_SPEC)) {
    for (const [cat2, kws] of Object.entries(subs)) {
      if (kws.some((kw) => name.includes(kw))) return { cat1, cat2 };
    }
  }
  return { cat1: DEFAULT_CAT1, cat2: DEFAULT_CAT2 };
}

/**
 * 格式化人民币显示
 */
export const fmtCny = (n: number) => n.toLocaleString("zh-CN", { 
  style: "currency", 
  currency: "CNY", 
  maximumFractionDigits: 2 
});

/**
 * 格式化数字显示
 */
export const money = (n: number) => n.toLocaleString("zh-CN", { 
  minimumFractionDigits: 2, 
  maximumFractionDigits: 2 
});

/**
 * 构建目录（仅供选配展示：qty 默认 1，不影响原数据）
 */
export function buildCatalog(groups: ProductGroup[]): CatalogItem[] {
  const acc: CatalogItem[] = [];
  for (const g of groups) {
    for (const row of g.items) {
      const { cat1, cat2 } = classifyByName(row.name);
      acc.push({ cat1, cat2, groupId: g.id, itemId: row.id, row: { ...row, qty: 1 } });
    }
  }
  return acc;
}

/**
 * 构建导航结构
 */
export function buildNavStructure(catalog: CatalogItem[]) {
  const map: Record<string, Set<string>> = {};
  for (const c of catalog) {
    (map[c.cat1] ||= new Set()).add(c.cat2);
  }
  
  const ordered: { cat1: string; cat2s: string[] }[] = [];
  for (const [k, subs] of Object.entries(CATEGORY_SPEC)) {
    if (map[k]?.size) {
      ordered.push({ cat1: k, cat2s: Object.keys(subs).filter((s) => map[k].has(s)) });
    }
  }
  
  if (map[DEFAULT_CAT1]?.size) {
    ordered.push({ cat1: DEFAULT_CAT1, cat2s: Array.from(map[DEFAULT_CAT1]) });
  }
  
  return ordered;
}
