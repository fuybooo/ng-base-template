declare type controlValidatorType = 'required' | 'maxlength' | 'minlength' | 'mistake';
declare type controlType = undefined | 'text' | 'select' | 'commonSelect' | 'checkbox' | 'checkboxes' | 'radio' | 'textarea' | 'switch' | 'number' | 'date' | 'date-range' | 'time' | 'file' | 'custom';
interface ControlValidator {
  type: controlValidatorType; // 验证类型
  value?: RegExp | number; // 验证类型附加值，最大最小值，验证正则等
  notAllow?: boolean; // 验证正则时的规则
  text?: string; // 验证提示语
}
export interface FormConfigItem {
  colType?: string; // 表单类型 view：表示显示状态
  type?: controlType; // 控件类别，不传值时默认为text
  label?: string; // 控件label
  field?: string; // 控件字段
  disabled?: boolean; // 是否禁用
  hidden?: boolean; // 是否隐藏
  defaultValue?: any; // 控件默认值
  validators?: ControlValidator[]; // 控件验证规则
  labelSpan?: number;
  inputSpan?: number;
  placeholder?: string;
  // select
  list?: any[]; // 传入的列表
  nzValueField?: string; // value所在字段
  nzLabelField?: string | Function; // label所在字段
  optionField1?: string; // 自定义选择框的显示值
  optionField2?: string; // 自定义选择框的显示值
  onSearch?: Function; // 自定义搜索方法
  mode?: string; // 选择模式 默认值为default
  // switch
  nzCheckedChildren?: string;
  nzUnCheckedChildren?: string;
  // custom
  custom?: string; // 自定义下拉框的特殊标志
}
export const FORMEVENT = {
  RESET: 'RESET'
};
export const nzLabelFormatter = (option, field1, field2) => option[field1] + '（' + option[field2] + '）';
export function findFormItem(formConfig, field): FormConfigItem {
  for (const row of formConfig) {
    for (const col of row) {
      if (col) {
        if (col.field === field) {
          return col;
        }
      }
    }
  }
}
export function simpleSetForm(formConfig, formValue) {
  for (const row of formConfig) {
    for (const col of row) {
      if (col) {
        col.defaultValue = formValue[col.field];
      }
    }
  }
}
