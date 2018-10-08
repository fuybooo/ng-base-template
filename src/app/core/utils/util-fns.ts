/**
 * 对数组按照指定属性值进行排序
 * list 要排序的数组
 * field 要排序的字段
 * sortOrder 排序规则 asc: 正序(默认) desc: 倒序
 */
import {REGEXP} from '../common.model';

declare type orderType = 'asc' | 'desc';

export function sortObjectList(list, field, sortOrder: orderType = 'asc') {
  return [...list.sort((a, b) => {
    if (a[field] > b[field]) {
      return (sortOrder === 'asc') ? 1 : -1;
    } else if (a[field] < b[field]) {
      return (sortOrder === 'desc') ? 1 : -1;
    } else {
      return 0;
    }
  })];
}

/**
 * 获取安全路径
 * 如 /abc/bbc/ => /abc/bbc
 * 如 /abc/bbc => /abc/bbc
 * @param {string} str
 * @returns {string}
 */
export function getSafeStr(str: string) {
  if (str.slice(-1) === '/') {
    return str.slice(0, str.length - 1);
  } else {
    return str;
  }
}

/**
 * 判断是否为空对象即 {}
 */
export function isEmptyObject(object) {
  return JSON.stringify(object) === '{}';
}

/**
 * 获取字符串中指定字符出现的次数
 */
export function getCharCount(regStr: string, str: string) {
  return str ? str.match(new RegExp(regStr, 'ig')).length : 0;
}

/**
 * 获取字符串中特定字符
 * 例如： 要将 '/a/123/bb'转化为'///'可以使用 getGivenStr('c', '/a/123/bb')
 */
export function getGivenStr(c: string, str: string) {
  return c.repeat(getCharCount(c, str));
}

/**
 * 判断字符串的真实长度，中文字符占2，英文字符占1
 * '上单的酒桶' 返回长度 5 * 2 = 10
 * '上单的酒桶adc' 返回长度 5 * 2 + 3 * 1 = 13
 */
export function getRealLength(str, chLen = 2) {
  let len = 0;
  str.split('').forEach(c => {
    len += (REGEXP.ch.test(c) ? chLen : 1);
  });
  return len;
}

/**
 * 根据一个值获取数组中该值对应的对象的其他属性的值
 * 只传list value时表示根据value取label
 * @param list 数组
 * @param value 值 或值数组
 * @param {string} valueKey 值对应的key 默认为value
 * @param {string} otherKey 要获取的值的key 默认为label 如果传入的值时'' 或者false，则返回该对象
 * @returns {string}
 */
export function getPropValue(list, value, valueKey = 'value', otherKey = 'label') {
  if (!list || value === '') {
    return '';
  }
  if (typeof value !== 'object') {
    value = [value];
  }
  return list.filter(_item => value.some(v => v === _item[valueKey])).map(i => i[otherKey]).join('、');
}

export function getDicValue(list, value) {
  return getPropValue(list, value, 'code', 'name');
}

/**
 * 根据指定keys获取新的子数组，默认获取id数组
 * 例如 getValueList([{id: 'abc'}, {id: 'bbc'}]) => ['abc', 'bbc']
 * 例如 getValueList([{id: 'abc', name: 'n1'}, {id: 'bbc', name: 'n2'}], ['name']) => ['n1', 'n2']
 * @param list
 * @param {string | string[]} keys
 * @returns {any}
 */
export function getValueList(list, keys: any = 'id') {
  if (typeof keys === 'string') {
    keys = [keys];
  }
  if (keys.length === 1) {
    return list.map(item => item[keys[0]]);
  } else {
    return list.map(item => {
      const value: any = {};
      keys.forEach(key => value[key] = item[key]);
      return value;
    });
  }
}

/**
 * 转换string和boolean
 * @param {string | boolean} sb
 */
export function switchSB(sb: string | boolean) {
  if (sb === '0') {
    return false;
  }
  if (sb === '1') {
    return true;
  }
  if (sb === true) {
    return '1';
  }
  if (sb === false) {
    return '0';
  }
}

/**
 * 生成uuid
 * @returns {string}
 */
export function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function trimList(list) {
  return [...list.filter(item => item !== '')];
}

/**
 * 将一维数组转换成2维数组
 * @param {any[]} list
 * @param {number} num
 * @returns {any[]}
 */
export function genArray(list: any[], num = 2) {
  return new Array(Math.ceil(list.length / num)).fill(0).map((item, i) => num === 1 ? list[i] : new Array(num).fill(0).map((_item, j) => list[i * num + j]));
}

/**
 * 深度trim
 * @param obj
 * @returns {any}
 */
export function deepTrim(obj) {
  if (obj === null) {
    return '';
  }
  const newObj = obj.constructor === Array ? [] : {};
  if (typeof obj !== 'object') {
    return;
  } else {
    for (const i in obj) {
      if (obj.hasOwnProperty(i)) {
        let objValue = obj[i];
        if (typeof objValue === 'string') {
          objValue = objValue.trim();
        }
        if (objValue === undefined || objValue === null) {
          objValue = '';
        }
        // 过滤为空的参数
        if (objValue === '') {
          continue;
        }
        newObj[i] = typeof objValue === 'object' ? deepTrim(objValue) : objValue;
      }
    }
  }
  return newObj;
}

export function isEqual(a: string | number, b: string | number) {
  return +a === +b;
}

export function equalDay(date, item) {
  return date.getFullYear() === +item.year
    && date.getMonth() + 1 === +item.month
    && date.getDate() === +item.day;
}

/**
 * 根据日期和特殊天判断当前天是否为假日
 * @param date
 * @param specialDay
 * @returns {any}
 */
export function isHoliday(date, specialDay) {
  if (specialDay) {
    // 判断特殊日期是否为假期
    return +specialDay.isholiday;
  } else {
    // 判断正常日期是否是周末
    return date.getDay() === 6 || date.getDay() === 0;
  }
}

export function formatJson(json: any, options: any = {}) {
  let reg = null,
    formatted = '',
    pad = 0;
  const PADDING = '    ';
  options.newlineAfterColonIfBeforeBraceOrBracket = !!options.newlineAfterColonIfBeforeBraceOrBracket;
  options.spaceAfterColon = !!options.spaceAfterColon;
  if (typeof json !== 'string') {
    json = JSON.stringify(json);
  } else {
    json = JSON.parse(json);
    json = JSON.stringify(json);
  }
  reg = /([\{\}])/g;
  json = json.replace(reg, '\r\n$1\r\n');
  reg = /([\[\]])/g;
  json = json.replace(reg, '\r\n$1\r\n');
  reg = /(\,)/g;
  json = json.replace(reg, '$1\r\n');
  reg = /(\r\n\r\n)/g;
  json = json.replace(reg, '\r\n');
  reg = /\r\n\,/g;
  json = json.replace(reg, ',');
  if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
    reg = /\:\r\n\{/g;
    json = json.replace(reg, ':{');
    reg = /\:\r\n\[/g;
    json = json.replace(reg, ':[');
  }
  if (options.spaceAfterColon) {
    reg = /\:/g;
    json = json.replace(reg, ':');
  }
  (json.split('\r\n')).forEach(function (node: any, index: any) {
    let i = 0,
      indent = 0,
      padding = '';

    if (node.match(/\{$/) || node.match(/\[$/)) {
      indent = 1;
    } else if (node.match(/\}/) || node.match(/\]/)) {
      if (pad !== 0) {
        pad -= 1;
      }
    } else {
      indent = 0;
    }
    for (i = 0; i < pad; i++) {
      padding += PADDING;
    }
    formatted += padding + node + '\r\n';
    pad += indent;
  });
  return formatted;
}

let compareRes = [];
/**
 * 比较两个简单对象的值，如果相同则返回true，否则返回false
 * 简单对象： key为string类型；值为 null, undefined, string, boolean, number, array, object
 * 支持 无限层级嵌套的对象，数组。
 * 有一个缺陷：要比较的数组的顺序必须保证一致。
 * @param objA
 * @param objB
 * @return {boolean}
 */
export function compareObj(objA: any, objB: any): boolean {
  compareRes = [];
  compare(objA, objB);
  return compareRes.every(item => item === true);
}

function compare(objA: any, objB: any) {
  if (objA === undefined || objA === null) {
    if (objB === undefined || objB === null) {
      compareRes.push(true);
    } else {
      compareRes.push(false);
    }
  } else {
    const typeA = typeof objA;
    const typeB = typeof objB;
    if (typeA === 'object') {
      if (typeB === 'object') {
        // 暂时只考虑 object 和 array
        const objTypeA = Object.prototype.toString.call(objA);
        const objTypeB = Object.prototype.toString.call(objB);
        if (objTypeA === objTypeB) {
          if (objTypeA === '[object Object]') {
            // 不能判断objA中的属性多还是objB中的属性多，所以进行两次循环
            for (const p in objA) {
              if (objA.hasOwnProperty(p)) {
                compare(objA[p], objB[p]);
              }
            }
            for (const p in objB) {
              if (objB.hasOwnProperty(p)) {
                compare(objB[p], objA[p]);
              }
            }
          } else if (objTypeA === '[object Array]') {
            for (let i = 0; i < objA.length; i ++) {
              compare(objA[i], objB[i]);
            }
            for (let i = 0; i < objB.length; i ++) {
              compare(objB[i], objA[i]);
            }
          }
        } else {
          compareRes.push(false);
        }
      } else {
        compareRes.push(false);
      }
    } else {
      // 此处typeA的可能值为 number boolean string (暂时只考虑这几种)
      if (objA === objB) {
        compareRes.push(true);
      } else {
        compareRes.push(false);
      }
    }
  }
}
export function clearObj(obj) {
  if (obj) {
    for (const p in obj) {
      obj[p] = null;
    }
  }
}
