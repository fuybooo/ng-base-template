import * as format from 'date-fns/format';
export const dateFormatter = (v) => v ? format(new Date(v), 'YYYY-MM-DD') : '';
export const showBoolean = (v) => v === 1 ? '是' : '否';

export interface Dictionary {
  code: string;
  name: string;
  item?: string;
}
export interface Dictionaries {
  TEST?: Dictionary[];
}

export interface Menu {
  label: string;
  code: string;
  route?: string;
  additionalRoutes?: Menu[]; // 路由与菜单不匹配时使用此配置项
  iconCls?: any;
  isActive?: boolean;
  isExpand?: boolean;
  children?: Menu[];
  params?: string;
  paramCount?: number;
  hideBreadcrumb?: boolean;
}
export const menuList: Menu[] = [
];
/**
 * 返回结果接口
 */
export interface HttpRes {
  code: number | string;
  msg: string;
  data: any | {
    results?: Array<any> | {
      list?: Array<any>,
      total?: number
    },
    // result?: Array<any> | {
    //   list?: Array<any>,
    //   total?: number
    // },
    pageNumber?: number,
    pageSize?: number,
    total?: number
  };
}

/**
 * 全局的localStorage key
 */
const projectPrefix = 'SF';
export const apiPathKey = projectPrefix + '_apiPathKey_';
export const langInfoKey = projectPrefix + '_langInfoKey_';
export const loginInfoKey = projectPrefix + '_loginInfoKey_';
/**
 * 进入用户页面时存储当前路由,以便之后返回
 * @type {string}
 */
export const userBackPageInfoKey = projectPrefix + '_userBackPageInfoKey_';
/**
 * 全局常量
 */
export const AJAXTYPE = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

/**
 * 全局的正则表达式
 */
export const REGEXP = {
  number: /\d/,
  onlyNumber: /^\d+$/,
  onlyChar: /^[a-zA-Z]+$/,
  charORNumber: /^[a-zA-Z0-9]+$/,
  cnMobile: /^1(3|4|5|7|8|9)\d{9}$/,
  ch: /[\u4e00-\u9fa5]/,
  email: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
  special: /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]·！￥（—）：；“”‘、，|《。》？【】]/im,
  onlyCapital: /^[A-Z]{2}$/,
};
