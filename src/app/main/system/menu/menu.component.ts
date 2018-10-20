import { Component, OnInit } from '@angular/core';
import {guid} from '../../../core/utils/util-fns';
import {FormGroup} from '@angular/forms';
import {findFormItem, FormConfigItem, FORMEVENT, simpleSetForm} from '../../../shared/component/form/form.model';
import {CoreService} from '../../../core/core.service';
import {NzMessageService} from 'ng-zorro-antd';
import {UtilService} from '../../../core/utils/util.service';
import {getSql} from '../../../core/utils/util-sql';
import {AJAXTYPE, HttpRes} from '../../../core/common.model';
import {urls} from '../../../core/urls.model';
import {getAllParent, getNodeByValue} from '../../../core/utils/util-component';
declare let $: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit {
  detailTitle = '菜单详情';
  opType = '';
  activedNode = null;
  formId = guid();
  form = new FormGroup({});
  formConfig: FormConfigItem[][] = [
    [
      {
        field: 'pcode',
        label: '上级编码',
        colType: 'view',
      }
    ],
    [
      {
        field: 'pname',
        label: '上级名称',
        colType: 'view',
      }
    ],
    [
      {
        field: 'code',
        label: '编码',
        validators: [
          {
            type: 'required'
          }
        ]
      }
    ],
    [
      {
        field: 'name',
        label: '名称',
        validators: [
          {
            type: 'required'
          }
        ]
      }
    ],
    [
      {
        field: 'proute',
        label: '上级URL',
        colType: 'view',
      }
    ],
    [
      {
        field: 'route',
        label: 'URL'
      }
    ],
    [
      {
        type: 'radio',
        field: 'issubordinate',
        label: '是否为从属',
        isNotSimpleSet: true
      }
    ],
    [
      {
        field: 'iconcls',
        label: '图标类名'
      }
    ],
    [
      {
        type: 'number',
        field: 'paramscount',
        label: '参数数量'
      }
    ],
    [
      {
        type: 'textarea',
        field: 'description',
        label: '描述'
      }
    ]
  ];
  formType = '';
  btnText = '保存';
  url = urls.menu;
  constructor(
    private core: CoreService,
    private message: NzMessageService,
    private util: UtilService
    ) { }

  ngOnInit() {
  }
  changeDropdown(event) {
    this.formType = '';
    this.opType = event.opType;
    this.activedNode = event.activedNode;
    this.setFormValue();
    if (event.opType === 'edit') {
      this.detailTitle = '编辑菜单';
      this.btnText = '保存';
    } else if (event.opType === 'addSub') {
      this.detailTitle = '新增子菜单';
      this.btnText = '保存';
    } else if (event.opType === 'view') {
      this.detailTitle = '菜单详情';
      this.formType = 'view';
      this.btnText = '编辑';
    }
  }
  afterSearch(event) {
    // 对当前树进行操作，激活树的当前节点，并展开其所有父节点。
    // if (this.opType === 'addSub') {
    //   // 根据form中的code找到当前新增的节点
    //   this.activedNode = getNodeByValue(event.nodes, this.form.value.code, 'code');
    //   this.core.menuTreeEvent.emit({type: 'ACTIVENODE', node: this.activedNode});
    //   this.core.menuTreeEvent.emit({type: 'RESETEXPANDKEYS', expandKeys: getAllParent(this.activedNode).map(item => item.key)});
    // }
  }
  setFormValue() {
    findFormItem(this.formConfig, 'iconcls').hidden = !(this.activedNode.origin.code && this.activedNode.origin.code.length === 6);
    let formValue: any = {...this.activedNode.origin};
    const isSubordinateItem = findFormItem(this.formConfig, 'issubordinate');
    if (this.opType === 'edit' || this.opType === 'view') {
      formValue.pcode = this.activedNode.parentNode ? this.activedNode.parentNode.origin.code || null : null;
      formValue.pname = this.activedNode.parentNode ? this.activedNode.parentNode.origin.name || null : null;
      formValue.proute = this.activedNode.parentNode ? this.activedNode.parentNode.origin.route || null : null;
      formValue.code = this.activedNode.origin.code;
      isSubordinateItem.hidden = !this.activedNode.isLeaf;
      isSubordinateItem.defaultValue = this.activedNode.origin.issubordinate ? 1 : 0;
    } else if (this.opType === 'addSub') {
      formValue = {};
      formValue.pcode = this.activedNode.origin.code;
      formValue.pname = this.activedNode.origin.name;
      formValue.proute = this.activedNode.origin.route;
      isSubordinateItem.defaultValue = formValue.pcode.length === 9 || this.activedNode.isLeaf ? 1 : 0;
      isSubordinateItem.hidden = false;
    }
    formValue.issubordinate = formValue.issubordinate === 1 ? 1 : 0;
    simpleSetForm(this.formConfig, formValue);
    this.core.globalFormEvent.emit({formId: this.formId, type: FORMEVENT.RESET});
  }
  handleForm(isCancel = false) {
    if (isCancel) {
      this.changeDropdown({activedNode: this.activedNode, opType: 'view'});
      return;
    }
    if (this.opType === 'view') {
      this.changeDropdown({activedNode: this.activedNode, opType: 'edit'});
    } else {
      const ajaxType = this.opType === 'addSub' ? AJAXTYPE.POST : AJAXTYPE.PUT;
      const params: any = {...this.form.value};
      delete params.pcode;
      delete params.pname;
      delete params.proute;
      if (this.opType === 'addSub') {
        params.pid = this.activedNode.key;
        params.psubordinateid = this.activedNode.origin.subordinateid;
      } else if (this.opType === 'edit') {
        params.id = this.activedNode.key;
        params.pid = this.activedNode.parentNode.key;
        params.psubordinateid = this.activedNode.parentNode.origin.subordinateid;
      }
      this.util.ajax(this.url, {
        ...params,
        ...getSql(this.url.url, ajaxType, params)
      }, ajaxType).subscribe((res: HttpRes) => {
        if (res.code === 200) {
          if (this.opType === 'addSub') {
            this.message.success('新增成功');
            // this.core.menuTreeEvent.emit({type: 'REFRESH'});
            // --- 优化
            this.core.menuTreeEvent.emit({type: 'addSub', code: params.code});
          } else if (this.opType === 'edit') {
            // 本地更新activedNode
            this.activedNode.title = this.form.value.name;
            this.activedNode.origin = {...this.activedNode.origin, ...params};
            // this.core.menuTreeEvent.emit({type: 'REFRESH', resetExpandKeys: true});
            // this.core.menuTreeEvent.emit({type: 'ACTIVENODE', node: this.activedNode});
            // --- 优化
            this.core.menuTreeEvent.emit({type: 'edit', node: this.activedNode});
            this.message.success('编辑成功');
          }
        }
      });
    }
  }
}
