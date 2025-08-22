/**
 * 物料选配相关类型定义
 */

export type Period = "one-time" | "yearly";

export interface ItemRow {
  id: string;
  name: string;
  spec?: string;
  unit: string;
  listPrice: number;
  discountPct: number;
  qty: number;
  period: Period;
  controlled: boolean;
}

export interface ProductGroup {
  id: string;
  name: string;
  version?: string;
  term?: string;
  items: ItemRow[];
}

export interface CatalogItem {
  cat1: string;
  cat2: string;
  groupId: string;
  itemId: string;
  row: ItemRow;
}

export interface NavStructure {
  cat1: string;
  cat2s: string[];
}

export interface Summary {
  total: number;
  yearly: number;
  oneTime: number;
}
