import {deepTrim, getGivenStr, getSafeStr} from './util-fns';
import {environment} from '../../../environments/environment';
import {HttpParams} from '@angular/common/http';
import {apiPathKey, loginInfoKey} from '../common.model';
import {UrlConfig} from '../urls.model';
import {Base64} from 'js-base64';
declare let $: any;

export function getUrl(mainUrl: UrlConfig, paramsId?): string {
  let path = getSafeStr(environment.apiPath);
  const localStorage_apiPath = localStorage.getItem(apiPathKey);
  if (environment.apiPathChangeable && localStorage && localStorage_apiPath) {
    environment.apiPath = path = getSafeStr(localStorage_apiPath);
  }
  const url = mainUrl.url + (paramsId === undefined || paramsId === '' ? '' : `/${paramsId}`);
  const staticUrl = environment.deployPath + '/assets/mock' + url + '.json';
  const serverUrl = path + url + '/';
  return environment.isForceServer ? serverUrl :
    (environment.isForceStatic ? staticUrl :
    (mainUrl.isStatic ? staticUrl : serverUrl));
}

/**
 * 检查路由参数是否匹配
 * @param item
 * @param url
 * @returns {boolean}
 */
export function matchRouteParamCount(item, url) {
  if (item.paramCount) {
    return url.startsWith(item.route) && item.paramCount === getGivenStr('/', url.slice(item.route.length)).length;
  } else {
    return url === item.route || matchAdditionalRoute(item, url);
  }
}
export function matchAdditionalRoute(item, url) {
  return item.additionalRoutes && item.additionalRoutes.find(val => {
    return matchRouteParamCount(val, url);
  });
}

/**
 * 将参数对象转化为查询参数
 */
export function getParams(paramsObject): HttpParams {
  let params = new HttpParams();
  for (const p in paramsObject) {
    if (paramsObject.hasOwnProperty(p)) {
      if (paramsObject[p] !== null) {
        let value = paramsObject[p];
        if (typeof value === 'string') {
          value = value.trim();
        }
        params = params.set(p, value);
      }
    }
  }
  return params;
}

/**
 * 将参数对象转化为查询参数
 */
export function getWholeParams(paramsObject) {
  return {params: getParams(paramsObject)};
}
export const defaultCommonParams = {
  pageNumber: 1,
  pageSize: 10,
  sortField: '',
  sortOrder: '',
};
function base64Sqls(sqls) {
  return sqls.map(s => Base64.encode(s));
}
/**
 * 获取公共参数
 * @param params
 * @param {string} method
 * @param {boolean} isLogin
 */
export function getCommonParams(params, method = 'get', isLogin = false) {
  const data = getLoginInfo();
  const sqls = params.sqls;
  // 当前项目所用的分页参数 start
  params.page = params.pageNumber;
  params.per_page = params.pageSize;
  delete params.pageNumber;
  delete params.pageSize;
  // 当前项目所用的分页参数 start end
  // 删除不需要的参数
  delete params.IIP; // iip 表示 id in params
  delete params.sqls; // iip 表示 id in params
  // 分页参数放在data外部的做法：
  // const {pagesize, pagenumber, sortfield, sortorder} = params;
  // delete params.pagesize;
  // delete params.pagenumber;
  // delete params.sortfield;
  // delete params.sortorder;
  return {
    data: JSON.stringify(deepTrim(params)),
    token: isLogin ? '' : (data ? data.userid : ''),
    // userid: isLogin ? '' : (data ? data.userid : ''),
    method,
    s: base64Sqls(sqls),
    action: params.action || '',
    // pagesize, pagenumber, sortfield, sortorder
  };
}

/**
 * 根据列数组和key数组获取符合要求的列数组
 * @param columnList
 * @param keys
 * @returns {any}
 */
export function getColumnList(columnList, keys) {
  // return keys.map(key => columnList.find(column => column.field === key || column.key === key));
  return getParentList(columnList, keys, 'field');
}

/**
 * 根据字数组获取父数组
 * allList 全部的父数组
 * subList 子数组 基本类型数组
 * subKey 子数组的key
 * subSubKey 字数组的另一种key
 * 例如 allList = [{id: 1, name: 'n1'}, {id: 2, name: 'n2'}, {id: 3, name: 'n3'}, {id: 4, name: 'n4'}]
 * subList = [1, 2];
 * subKey = 'id'
 * 返回值为 [{id: 1, name: 'n1'}, {id: 2, name: 'n2'}]
 */
export function getParentList(allList, subList, subKey = 'id', subSubKey = 'key') {
  return subList.map(key => allList.find(item => (item[subKey] === (typeof key === 'object' ? key[subKey] : key)) || item[subSubKey] === (typeof key === 'object' ? key[subSubKey] : key)));
}

export function extendAll(list, allValue = 'all', allLabel = '全部', valueKey = 'id', labelKey = 'name') {
  return [{[valueKey]: allValue, [labelKey]: allLabel}, ...removeAll(list, valueKey, allValue)];
}
export function removeAll(list, valueKey = 'id', allValue = 'all') {
  return list.filter(item => item[valueKey] !== allValue);
}

/**
 * 将输入的值转换为对应的大写
 * @param event
 * @param name
 * @param form
 */
export function upperCase(event, name, form) {
  form.controls[name].setValue(event.target.value.toUpperCase());
}
export function getMenu(menus, staticMenus) {
  return staticMenus.map(item => {
    if (item.children) {
      return ({
        ...item,
        id: menus.find(m => m.code === item.code).id,
        children: item.children.map(child => ({
          ...child,
          id: menus.find(m => {
            return m.code === child.code;
          }).id
        }))
      });
    } else {
      return ({
        ...item,
        id: menus.find(m => {
          return m.code === item.code;
        }).id
      });
    }
  });
}
export function getRoleMenu(menuIdList, allMenu) {
  return getParentList(allMenu, menuIdList).filter(item => !!item).map(item => {
    if (item.children) {
      // 不考虑出现只有父菜单而没有子菜单的情况
      return {
        ...item,
        children: getParentList(item.children, menuIdList).filter(_item => !!_item)
      };
    } else {
      return item;
    }
  });
}
export function getRolePermission(menuIdList, allPermission) {
  return menuIdList.map(item => allPermission.find(p => p.id === item).code);
}
export function getSelectedMenuByIdList(menuIdList, allMenu) {
  return allMenu.map(item => {
    if (item.children) {
      return ({
        ...item,
        disabled: !menuIdList.some(m => m === item.id), // 找到了，则为启用
        children: item.children.map(child => ({
          ...child,
          disabled: !menuIdList.some(m => m === child.id)
        }))
      });
    } else {
      return ({
        ...item,
        disabled: !menuIdList.some(m => m === item.id)
      });
    }
  });
}
export function getSelectedMenuId(allMenu) {
  const menus = [];
  allMenu.forEach(item => {
    if (!item.disabled) {
      menus.push(item.id);
      if (item.children) {
        item.children.forEach(child => {
          if (!child.disabled) {
            menus.push(child.id);
          }
        });
      }
    }
  });
  return menus;
}

/**
 * 任务详情是否显示操作按钮
 * @param data
 * @returns {boolean}
 */
export function isShowOpBtn(data) {
  let flag = false;
  const loginInfo = getLoginInfo();
  if (loginInfo && data.issubmit !== '1') {
    if (loginInfo.role === '2') {
      flag = true;
    } else if (loginInfo.role === '1') {
      if (loginInfo.userid === data.liableid) {
        flag = true;
      }
    }
  }
  return flag;
}

/**
 * 将登陆信息保存到cookie中
 */
export function saveLoginInfo(data) {
  const cookieConfig = {expires: 7};
  $.cookie('userName', data.userName, cookieConfig);
  localStorage.setItem(loginInfoKey, JSON.stringify(data));
}

/**
 * 从localStorage中取出登录信息
 * @returns {any}
 */
export function getLoginInfo() {
  return JSON.parse(localStorage.getItem(loginInfoKey));
}
