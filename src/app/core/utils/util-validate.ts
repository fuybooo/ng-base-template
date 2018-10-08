import {FormControl} from '@angular/forms';

/**
 * 去前后空格后判断是否为空
 * @param {FormControl} control
 * @returns {any}
 */
export function required(control: FormControl) {
  if (typeof control.value === 'string') {
    return control.value.trim().length === 0 ? {required: true, error: true} : null;
  } else if (control.value instanceof Array) {
    return control.value.length === 0 ? {required: true, error: true} : null;
  } else if (control.value !== 0) {
    return control.value ? null : {required: true, error: true};
  } else {
    return null;
  }
}

/**
 * 去前后空格后判断长度上限
 */
export function maxLength(maxLen: number) {
  return function (control: FormControl) {
    const value = control.value;
    if (value && value.trim) {
      if (value.trim().length > maxLen) {
        return {maxlength: true, error: true};
      }
    }
  };
}

/**
 * 去前后空格后判断长度下限
 */
export function minLength(minLen: number) {
  return function (control: FormControl) {
    const value = control.value;
    if (value && value.trim) {
      if (value.trim().length < minLen) {
        return {minlength: true, error: true};
      }
    }
  };
}
/**
 * 验证控件的值是否符合要求
 * @param specialCharacter 特殊字符正则表达式
 * @param mode 如何进行校验
 * true：正则匹配通过则字符串不符合要求 - 例如：验证控件不允许输入特殊字符
 * false：正则匹配不通过则字符串不符合要求 - 例如：验证控件只能输入某些字符
 * @returns {(control:FormControl)=>any}
 */
export function getSpecialCharacterValidator(specialCharacter: RegExp, mode = true) {
  return function (control: FormControl) {
    if (control.value && control.value.trim() !== '') {
      if (mode) {
        if (specialCharacter.test(control.value.trim())) {
          return {error: true, mistake: true};
        } else {
          return null;
        }
      } else {
        if (!specialCharacter.test(control.value.trim())) {
          return {error: true, mistake: true};
        } else {
          return null;
        }
      }
    }
  };
}

/**
 * 判断控件与本地的list是否重复
 * @param list
 * @param key
 * @returns {(control:FormControl)=>{error: boolean, duplicated: boolean}}
 */
export function getIsDupValidator(list, key = 'name') {
  return function (control: FormControl) {
    if (control.value && control.value.trim() !== '') {
      // 判断控件是否重复
      if (list.some(item => item[key] === control.value)) {
        return {error: true, dup: true};
      }
    }
  };
}
