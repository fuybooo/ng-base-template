import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {getSql} from '../../../../core/utils/util-sql';
import {AJAXTYPE, HttpRes} from '../../../../core/common.model';
import {getNodesByList} from '../../../../core/utils/util-component';
import {urls} from '../../../../core/urls.model';
import {UtilService} from '../../../../core/utils/util.service';
import {NzDropdownContextComponent, NzDropdownService, NzTreeComponent} from 'ng-zorro-antd';

@Component({
  selector: 'app-menu-tree',
  templateUrl: './menu-tree.component.html',
  styleUrls: ['./menu-tree.component.less']
})
export class MenuTreeComponent implements OnInit {
  @ViewChild('nzTree') nzTree: NzTreeComponent;
  @Input() checkedKeys = [];
  @Input() checkable = false;
  @Input() treeBoxCls = 'tree-box';
  @Input() isCustom = false;
  @Output() changeCheckBox = new EventEmitter();
  dropdown: NzDropdownContextComponent;
  menus = [];
  expandKeys = [];
  menuList = [];
  constructor(
    private util: UtilService,
    private dropdownService: NzDropdownService
  ) { }

  ngOnInit() {
    this.searchMenuList();
  }
  searchMenuList() {
    this.util.get(urls.menu, getSql(urls.menu.url, AJAXTYPE.GET)).subscribe((res: HttpRes) => {
      if (res.code === 200) {
        this.menus = getNodesByList(res.data.results[0].filter(item => !item.issubordinate));
        // 将根节点展开
        this.expandKeys = res.data.results[0].filter(item => !item.pid).map(item => item.id);
      }
    });
  }
  getMenuList() {
    let menuList = [];
    /**
     * 递归获取选中的节点
     * @param tree
     */
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
  clickNode(node) {
    console.log('点击：', node);
  }
  selectDropdown(opType) {
    console.log(opType);
    this.dropdown.close();
  }
  contextMenu($event, template) {
    console.log('右键：', $event);
    this.dropdown = this.dropdownService.create($event, template);
  }
  checkBoxChange() {
    this.getMenuList();
    this.changeCheckBox.emit(this.menuList);
  }
}
