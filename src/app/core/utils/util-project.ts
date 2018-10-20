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
  return sqls ? sqls.map(s => Base64.encode(s)) : sqls;
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
  // params.page = params.pageNumber;
  // params.per_page = params.pageSize;
  // delete params.pageNumber;
  // delete params.pageSize;
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
 * subSubKey 子数组的另一种key
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
  $.cookie('userName', data.name, cookieConfig);
  localStorage.setItem(loginInfoKey, JSON.stringify(data));
}

/**
 * 从localStorage中取出登录信息
 * @returns {any}
 */
export function getLoginInfo() {
  return JSON.parse(localStorage.getItem(loginInfoKey));
}


/**
 * 获取匹配的路由
 */
export function getMatchedNavMenu(crtUrl, menuTree, subordinateList): any {
  /**
   * 获取字符串中char出现的位置数组
   */
  function getCharIndexArray(str, char = '/') {
    return str.split('').map((c, i) => ({i, c: c === char})).filter(item => item.c).map(item => item.i);
  }
  function getRootUrl(menu) {
    let rootUrl = crtUrl;
    if (menu.paramscount) {
      const arr = getCharIndexArray(crtUrl);
      // 当前路由的根路由
      rootUrl = crtUrl.slice(0, arr[arr.length - menu.paramscount]);
    }
    return rootUrl;
  }
  function getCrt(menu) {
    // 1. 与其本身匹配
    let rootUrl = getRootUrl(menu);
    if (rootUrl === menu.route) {
      // 有匹配项
      return {menu};
    } else if (menu.subordinateid) {
      // 2. 与其从属匹配
      // 找到从属列表
      const menuSubordinateList = menu.subordinateid.split(',').map(id => subordinateList.find(item => item.id === id));
      // 循环从属列表
      for (let sI = 0, sL = menuSubordinateList.length; sI < sL; sI ++) {
        const s = menuSubordinateList[sI];
        // 根据从属列表中的项获取当前路由的rootUrl
        rootUrl = getRootUrl(s);
        // 如果当前路由的rootUrl与从属路由中的route相等，则返回当前路由的信息
        if (rootUrl === s.route) {
          // 有匹配项
          return {menu, s};
        }
      }
    }
    return;
  }
  let crtNav, crtMenu, crtPathList;
  // 循环导航栏
  F: for (let navI = 0, navL = menuTree.length; navI < navL; navI ++) {
    const nav = menuTree[navI];
    // 循环左侧一级菜单树
    for (let nI = 0, nL = nav.children.length; nI < nL; nI ++) {
      const n = nav.children[nI];
      // 是否有子菜单
      if (n.children && n.children.length) {
        // 循环每一个子菜单
        for (let menuI = 0, menuL = n.children.length; menuI < menuL; menuI ++) {
          const menu = n.children[menuI];
          const result = getCrt(menu.origin);
          if (result) {
            crtPathList = [nav, n, menu];
            if (result.s) {
              crtPathList.push(result.s);
            }
            crtMenu = result.menu;
            crtNav = nav;
            break F;
          }
        }
      } else {
        // 没有子菜单
        const result = getCrt(n.origin);
        if (result) {
          crtPathList = [nav, n];
          if (result.s) {
            crtPathList.push(result.s);
          }
          crtMenu = result.menu;
          crtNav = nav;
          break F;
        }
      }
    }
  }
  return {crtNav, crtMenu, crtPathList};
}
