import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {guid} from '../../../../core/utils/util-fns';
import {FormGroup} from '@angular/forms';
import {findFormItem, FormConfigItem, FORMEVENT} from '../../../../shared/component/form/form.model';
import {UtilService} from '../../../../core/utils/util.service';
import {urls} from '../../../../core/urls.model';
import {AJAXTYPE, HttpRes} from '../../../../core/common.model';
import {getNodesByList} from '../../../../core/utils/util-component';
import {NzMessageService, NzTreeComponent} from 'ng-zorro-antd';
import {getSql} from '../../../../core/utils/util-sql';
import {CoreService} from '../../../../core/core.service';

@Component({
  selector: 'app-permission-info',
  templateUrl: './permission-info.component.html',
  styleUrls: ['./permission-info.component.less']
})
export class PermissionInfoComponent implements OnInit {
  @ViewChild('nzTree') nzTree: NzTreeComponent;
  formId = guid();
  form = new FormGroup({});
  formConfig: FormConfigItem[][] = [
    [
      {
        label: '名称',
        field: 'name',
        validators: [
          {
            type: 'required'
          }
        ]
      }
    ],
    [
      {
        type: 'textarea',
        label: '描述',
        field: 'description',
        validators: [
          {
            type: 'required'
          }
        ]
      }
    ],
  ];
  op;
  id;
  titleText;
  menus;
  expandKeys = [];
  checkedKeys = [];
  originMenuList = [];
  url = urls.permission;
  showForm = false;
  checkBoxChanged = false; // tree是否被点击过
  menuList = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private util: UtilService,
    private message: NzMessageService,
    private core: CoreService
  ) { }

  ngOnInit() {
    this.searchMenuList();
    this.op = this.route.snapshot.params.op;
    this.id = this.route.snapshot.params.id;
    if (this.op === 'add') {
      this.titleText = '新增';
      this.showForm = true;
      // 新增时需要初始化表单
      this.core.globalFormEvent.emit({formId: this.formId, type: FORMEVENT.RESET});
    } else if (this.op === 'edit') {
      this.titleText = '编辑';
      this.searchPermissionDetail();
    }
  }
  searchPermissionDetail() {
    this.util.get(urls.permission, {
      id: this.id,
      ...getSql(urls.permission.url, AJAXTYPE.GET, {id: this.id})
    }).subscribe((res: HttpRes) => {
      if (res.code === 200) {
        const permission = res.data.results[0][0];
        findFormItem(this.formConfig, 'name').defaultValue = permission.name;
        findFormItem(this.formConfig, 'description').defaultValue = permission.description;
        this.checkedKeys = [...res.data.results[1].filter(item => item.ishalf === 0).map(item => item.id)];
        this.originMenuList = [...res.data.results[1]];
        this.menuList = [...res.data.results[1]];
        this.showForm = true;
      }
    });
  }
  searchMenuList() {
    this.util.get(urls.menu, getSql(urls.menu.url, AJAXTYPE.GET)).subscribe((res: HttpRes) => {
      if (res.code === 200) {
        this.menus = getNodesByList(res.data.results);
        // 将根节点展开
        this.expandKeys = res.data.results.filter(item => !item.pid).map(item => item.id);
      }
    });
  }
  getMenuList() {
    let menuList = [];
    const reGetMenuList = function (tree) {
      tree.forEach(item => {
        menuList = [...menuList, item];
        if (item.children && item.children.length) {
          reGetMenuList(item.children);
        }
      });
    };
    reGetMenuList(this.nzTree.getCheckedNodeList());
    this.menuList = [...menuList.map(item => ({id: item.key, isHalf: false})), ...this.nzTree.getHalfCheckedNodeList().map(item => ({id: item.key, isHalf: true}))];
  }

  /**
   * 仅仅检查用户是否点击了checkbox
   */
  checkBoxChange() {
    this.getMenuList();
    this.checkBoxChanged = true;
  }

  /**
   * 按钮是否禁用
   */
  getBtnDisabled() {
    // 如果menuList为空则禁用
    if (!this.menuList.length) {
      return true;
    }
    // 如果tree被点击过，则判断表单是否无效即可
    if (this.checkBoxChanged) {
      return this.form.invalid;
    } else {
      // 如果没有被点击过，则判断表单是否无效，或者是否 pristine
      return this.form.invalid || this.form.pristine;
    }
  }
  save() {
    if (!this.menuList.length) {
      this.message.error('请选择菜单');
    }
    let addMenuList = [];
    const delMenuList = [];
    if (this.op === 'add') {
      addMenuList = [...this.menuList];
    } else if (this.op === 'edit') {
      // 以origin为标准，判断改变了的项，减少的是del，新增的是add
      this.menuList.forEach(m => {
        if (!this.originMenuList.some(o => m.id === o.id)) {
          addMenuList.push(m);
        }
      });
      this.originMenuList.forEach(o => {
        if (!this.menuList.some(m => m.id === o.id)) {
          delMenuList.push(o);
        }
      });
    }
    const params = {
      ...this.form.value,
      id: this.id,
      menuList: {
        add: addMenuList,
        del: delMenuList
      },
    };
    const ajaxType = this.op === 'add' ? AJAXTYPE.POST : AJAXTYPE.PUT;
    this.util.ajax(this.url, {
      ...params,
      ...getSql(this.url.url, ajaxType, params)
    }, ajaxType).subscribe((res: HttpRes) => {
      if (res.code === 200) {
        this.message.success('执行成功');
        this.back();
      }
    });
  }
  back() {
    this.router.navigateByUrl('/main/permission/list');
  }

}
