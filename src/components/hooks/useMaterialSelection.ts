import { useState, useCallback, useMemo } from 'react';
import { CatalogItem, ProductGroup, Summary } from '../types';
import { fmtCny } from '../utils';

/**
 * 物料选择逻辑 Hook
 */
export function useMaterialSelection(catalog: CatalogItem[]) {
  // 选中数量状态
  const [selected, setSelected] = useState<Record<string, number>>({});
  
  // 勾选状态管理
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  // 修改数量变化处理函数，自动同步勾选状态
  const addSel = useCallback((gid: string, iid: string, delta = 1) => {
    const key = `${gid}:${iid}`;
    const newQty = Math.max((selected[key] || 0) + delta, 0);
    
    setSelected(prev => ({ ...prev, [key]: newQty }));
    
    // 自动同步勾选状态
    if (newQty > 0) {
      setCheckedItems(prev => ({ ...prev, [key]: true }));
    } else {
      setCheckedItems(prev => ({ ...prev, [key]: false }));
    }
  }, [selected]);

  // 修改移除选择函数，自动同步勾选状态
  const removeSel = useCallback((gid: string, iid: string) => {
    const key = `${gid}:${iid}`;
    const newQty = Math.max((selected[key] || 0) - 1, 0);
    
    setSelected(prev => ({ ...prev, [key]: newQty }));
    
    // 自动同步勾选状态
    if (newQty > 0) {
      setCheckedItems(prev => ({ ...prev, [key]: true }));
    } else {
      setCheckedItems(prev => ({ ...prev, [key]: false }));
    }
  }, [selected]);

  // 修改清空选择函数，自动同步勾选状态
  const clearSel = useCallback(() => {
    setSelected({});
    setCheckedItems({}); // 清空所有勾选状态
  }, []);

  // 勾选/取消勾选处理函数
  const toggleItemCheck = useCallback((key: string) => {
    const currentQty = selected[key] || 0;
    
    if (currentQty === 0) {
      // 数量为0时勾选，自动设置为1
      setSelected(prev => ({
        ...prev,
        [key]: 1
      }));
      setCheckedItems(prev => ({
        ...prev,
        [key]: true
      }));
    } else {
      // 数量大于0时取消勾选，自动设置为0
      setSelected(prev => ({
        ...prev,
        [key]: 0
      }));
      setCheckedItems(prev => ({
        ...prev,
        [key]: false
      }));
    }
  }, [selected]);

  // 全选/取消全选处理函数
  const toggleAllCheck = useCallback(() => {
    const allKeys = catalog.map(ci => `${ci.groupId}:${ci.itemId}`);
    const allChecked = allKeys.every(key => checkedItems[key]);
    
    if (allChecked) {
      // 取消全选：勾选取消，数量都置为0
      setCheckedItems({});
      setSelected({}); // 所有数量置为0
    } else {
      // 全选：勾选所有物料，数量为0的设置为1，数量≥1的保持不变
      const newChecked: Record<string, boolean> = {};
      const newSelected: Record<string, number> = { ...selected };
      
      allKeys.forEach(key => {
        newChecked[key] = true;
        
        // 如果数量为0，设置为1；如果数量≥1，保持不变
        if ((selected[key] || 0) === 0) {
          newSelected[key] = 1;
        }
      });
      
      setCheckedItems(newChecked);
      setSelected(newSelected);
    }
  }, [catalog, checkedItems, selected]);

  // 汇总计算
  const summary = useMemo((): Summary => {
    let total = 0, yearly = 0, oneTime = 0;
    for (const [key, q] of Object.entries(selected)) {
      if (!q) continue;
      const [gid, iid] = key.split(":");
      const ci = catalog.find((x) => x.groupId === gid && x.itemId === iid);
      if (!ci) continue;
      const line = q * ci.row.listPrice;
      total += line;
      ci.row.period === "yearly" ? (yearly += line) : (oneTime += line);
    }
    return { total, yearly, oneTime };
  }, [selected, catalog]);

  return {
    selected,
    checkedItems,
    addSel,
    removeSel,
    clearSel,
    toggleItemCheck,
    toggleAllCheck,
    summary
  };
}
