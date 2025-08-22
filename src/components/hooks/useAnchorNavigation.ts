import { useState, useRef, useCallback, useEffect } from 'react';
import { NavStructure } from '../types';

/**
 * 锚点导航逻辑 Hook
 */
export function useAnchorNavigation(navStructure: NavStructure[]) {
  // 展开状态
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  
  // 激活的二级分类
  const [activeC2, setActiveC2] = useState<string>("");
  
  // 点击时锁定的高亮
  const [clickedC2, setClickedC2] = useState<string | null>(null);
  
  // 手动滚动时记录的锚点
  const [scrolledC2, setScrolledC2] = useState<string | null>(null);
  
  // 引用
  const listRef = useRef<HTMLDivElement | null>(null);
  const c2Refs = useRef<Record<string, HTMLDivElement | null>>({});

  // 点击锚点时
  const scrollToC2 = useCallback((c2: string) => {
    // 设置点击状态，锁定高亮
    setClickedC2(c2);
    setActiveC2(c2); // 立即高亮
    
    // 滚动逻辑
    const targetEl = c2Refs.current[c2];
    const listContainer = listRef.current;
    
    if (targetEl && listContainer) {
      // 计算目标元素相对于容器的位置
      const containerRect = listContainer.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();
      
      // 计算需要滚动的距离
      const scrollTop = listContainer.scrollTop + (targetRect.top - containerRect.top) - 35;
      
      // 使用容器的 scrollTo 方法，只在物料选配区域内滚动
      listContainer.scrollTo({
        top: scrollTop,
        behavior: 'smooth'
      });
    }
  }, []);

  // 滚动监听器
  useEffect(() => {
    const listContainer = listRef.current;
    if (!listContainer) return;
    
    const handleScroll = () => {
      // 找到当前在可视区域内的二级分类
      let currentC2 = "";
      let minDistance = Infinity;
      
      for (const [c2, node] of Object.entries(c2Refs.current)) {
        if (!node) continue;
        
        const rect = node.getBoundingClientRect();
        const listRect = listContainer.getBoundingClientRect();
        
        // 简单的距离计算
        const distance = Math.abs(rect.top - listRect.top);
        
        if (distance < minDistance) {
          minDistance = distance;
          currentC2 = c2;
        }
      }
      
      // 更新激活状态
      if (currentC2 && currentC2 !== activeC2) {
        setActiveC2(currentC2);
      }
    };
    
    // 绑定滚动事件
    listContainer.addEventListener("scroll", handleScroll);
    
    // 初始调用一次
    handleScroll();
    
    return () => listContainer.removeEventListener("scroll", handleScroll);
  }, []); // 空依赖，只绑定一次

  // 确保锚点引用正确设置
  const setC2Ref = useCallback((c2: string, el: HTMLDivElement | null) => {
    if (el) {
      c2Refs.current[c2] = el;
    }
  }, []);

  // 初始化激活状态
  useEffect(() => {
    if (navStructure.length > 0 && navStructure[0].cat2s.length > 0) {
      setActiveC2(navStructure[0].cat2s[0]);
    }
  }, [navStructure]);

  // 初始化展开状态
  useEffect(() => {
    const init: Record<string, boolean> = {};
    navStructure.forEach((n) => (init[n.cat1] = true));
    setExpanded(init);
  }, [navStructure]);

  return {
    expanded,
    setExpanded,
    activeC2,
    clickedC2,
    scrolledC2,
    listRef,
    c2Refs,
    scrollToC2,
    setC2Ref
  };
}
