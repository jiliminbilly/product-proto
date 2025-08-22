import { ProductGroup } from './types';

/**
 * 分类规格配置
 */
export const CATEGORY_SPEC: Record<string, Record<string, string[]>> = {
  "产品主件": {
    "系统软件": ["系统软件", "平台软件", "软件包"],
    "系统主机": ["主机", "平台主机", "服务器", "系统主机"],
  },
  "产品配件": {
    "板卡模块": ["板卡", "卡", "模块", "扩展网卡", "接口卡"],
    "存储模块": ["存储", "SSD", "硬盘"],
    "电源模块": ["电源"],
    "接口模块": ["接口模块", "接口"],
    "其他配件": ["配件", "附件", "其他"],
    "配套设备": ["配套设备", "设备"],
    "配套软件": ["配套软件"],
  },
  "产品授权": {
    "功能授权": ["功能授权", "授权", "功能许可", "智能"],
    "性能授权": ["性能授权", "性能许可"],
    "特征库升级授权": ["特征库", "病毒库", "规则库"],
    "版本升级授权": ["版本升级", "升级授权"],
  },
  "产品订阅服务": {
    "功能订阅服务授权": ["功能订阅", "订阅服务"],
    "性能订阅服务授权": ["性能订阅"],
  },
  "专业产品服务": {
    "产品定制开发服务": ["定制开发", "开发服务"],
    "产品安装部署服务": ["安装", "部署"],
    "标准维保服务": ["维保", "保修"],
    "巡检服务": ["巡检"],
    "部件备件服务": ["备件", "部件"],
  },
  "专业安全服务": {
    "安全运营服务": ["运营服务"],
    "集成服务": ["集成"],
    "其他专业安全服务": ["其他专业安全服务", "其他服务"],
    "应急响应服务": ["应急响应", "应急"],
    "值守服务": ["值守"],
    "驻场服务": ["驻场"],
    "咨询规划服务": ["咨询", "规划"],
    "现场技术支持服务": ["现场技术支持", "技术支持"],
  },
};

export const DEFAULT_CAT1 = "未分类";
export const DEFAULT_CAT2 = "其他";

/**
 * 种子数据
 */
export const seedGroups: ProductGroup[] = [
  { id: "p1", name: "TSS10000-A58-WS", version: "省公安指挥及协同4.0", term: "1年", items: [
    { id: "p1-1", name: "系统主机（评审平台主机）", spec: "2U设备，含安装", unit: "台", listPrice: 1347192, discountPct: 0, qty: 2, period: "one-time", controlled: false },
    { id: "p1-2", name: "智能辅助研判功能授权（年）", spec: "开通一年服务权限", unit: "年", listPrice: 404157.6, discountPct: 0, qty: 2, period: "yearly", controlled: true },
    { id: "p1-3", name: "扩展网卡模块", unit: "块", listPrice: 2960, discountPct: 0, qty: 4, period: "one-time", controlled: false },
  ]},
  { id: "p2", name: "NSG4000-TG45", version: "网神SecGate3600防火墙系统V3.6.0", items: [
    { id: "p2-1", name: "防火墙主控单机主机", unit: "台", listPrice: 4000, discountPct: 0, qty: 4, period: "one-time", controlled: false },
    { id: "p2-2", name: "功能授权-下一代防火墙高级软件授权（年）", unit: "年", listPrice: 4000, discountPct: 0, qty: 2, period: "yearly", controlled: true },
    { id: "p2-3", name: "IPSEC VPN板卡模块(1000条隧道)", unit: "个", listPrice: 4000, discountPct: 0, qty: 2, period: "yearly", controlled: false },
  ]},
  { id: "p3", name: "测试型号Q25071401", version: "SecAV3600防毒墙系统V3.1", items: [
    { id: "p3-1", name: "标准维保服务（年）", unit: "年", listPrice: 7000, discountPct: 0, qty: 2, period: "yearly", controlled: true },
  ]},
];
