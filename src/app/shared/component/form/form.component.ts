import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CoreService} from '../../../core/core.service';
import {FormConfigItem, FORMEVENT} from './form.model';
import {getSpecialCharacterValidator} from '../../../core/utils/util-validate';
import {getPropValue, isEmptyObject} from '../../../core/utils/util-fns';
import {urls} from '../../../core/urls.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less']
})
export class FormComponent implements OnInit, OnDestroy {
  @Input() formId; // 表单唯一id，必传切唯一
  @Input() nzGutter = 30; // 横向间距，默认为30，在一行显示两列时起作用
  @Input() formConfig: FormConfigItem[][]; // 主要配置项，必传
  @Input() form: FormGroup; // form表单主体，必传
  @Input() formType = ''; // form表单类型，默认为空，表示增改，可选为view，表示查看
  @Input() formAuxConfig: any = {};
  @Input() isGlobalEvent; // 是否需要全局事件去发射form表单的变化 默认为false // todo 长时间无用的话将会删掉
  @Output() formChange = new EventEmitter(); // 表单变化事件
  // formDimension = 2; // 表单的维度
  defLabelSpan = 7;
  defSingleInputSpan = 14; // 每行显示一个时 input的宽度
  defMultipleInputSpan = 17; // 每行显示多个时 input的宽度
  defSelectUrl = urls.user;
  timer;
  subscript;
  constructor(
    private fb: FormBuilder,
    private coreService: CoreService
  ) { }

  ngOnInit() {
    /**
     * 只有在点击保存时才发射form表单
     */
    if (this.isGlobalEvent) {
      this.subscript = this.coreService.globalFormEvent.subscribe((event) => {
        if (event && event.formId === this.formId && event.type === FORMEVENT.RESET) {
          this.initForm();
        }
      });
    }
    this.initForm();
  }
  ngOnDestroy() {
    if (this.subscript) {
      this.subscript.unsubscribe();
    }
  }
  initForm() {
    // 根据formConfig 生成form
    const group: any = {};
    this.formConfig.forEach((row: any[]) => row.forEach((col: any) => {
      if (col) {
        group[col.field] = [
          {value: col.defaultValue || null, disabled: col.disabled || this.formType === 'disable'},
          [...(col.validators && col.validators.length ? col.validators.map(validator => {
            switch (validator.type) {
              case 'required':
                return Validators.required;
              case 'maxlength':
                return Validators.maxLength(validator.value);
              case 'minlength':
                return Validators.minLength(validator.value);
              case 'mistake':
                return getSpecialCharacterValidator(validator.value, validator.notAllow);
            }
          }) : [])]
        ];
      }
    }));
    this.form = this.fb.group(group);
    this.initFormAuxConfig();
    this.changeControl();
  }
  initFormAuxConfig() {
    if (this.formConfig[0].length === 1) {
      this.formAuxConfig.inputSpan = this.formAuxConfig.inputSpan || this.defSingleInputSpan;
    } else {
      this.formAuxConfig.inputSpan = this.formAuxConfig.inputSpan || this.defMultipleInputSpan;
    }
    this.formAuxConfig.labelSpan = this.formAuxConfig.labelSpan || this.defLabelSpan;
  }
  changeControl() {
    this.formChange.emit(this.form);
  }
  $control(name) {
    return this.form.controls[name];
  }
  $(name) {
    return this.$control(name).value;
  }
  isRequired(col) {
    return this.formType === 'view' || col.colType === 'view' ? false : (col.validators ? col.validators.some(v => v.type === 'required') : false);
  }
  getValidatorText(v) {
    switch (v.type) {
      case 'required':
        return '必填项不能为空';
      case 'maxlength':
        return '最多输入' + v.value + '位';
      case 'minlength':
        return '最少输入' + v.value + '位';
      case 'mistake':
        return '输入不合规范';
    }
  }
  fileChange(file, col) {
    this.$control(col.field).setValue(file.files);
    this.form.markAsDirty();
    this.changeControl();
  }
  getViewValue(col) {
    const defaultValueField = 'code';
    const defaultLabelField = 'name';
    return getPropValue(col.list, this.$(col.field), col.nzValueField || defaultValueField, col.nzLabelField || defaultLabelField);
  }
  getNzLabel(option, col) {
    if (typeof col.nzLabelField === 'string') {
      return option[col.nzLabelField || 'name'];
    } else if (typeof col.nzLabelField === 'function') {
      return col.nzLabelField(option, col.optionField1, col.optionField2);
    }
  }
  onSearchSelect(col, event) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      col.onSearch(event);
    }, 300);
  }

  /**
   * 通用表格改变值时
   * @param value
   * @param col
   */
  changeSelectedItem(value, col) {
    this.$control(col.field).setValue(value);
    this.$control(col.field).markAsDirty();
    this.changeControl();
  }
}
