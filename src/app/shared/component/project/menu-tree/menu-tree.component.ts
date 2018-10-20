import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {getSql} from '../../../../core/utils/util-sql';
import {AJAXTYPE, HttpRes} from '../../../../core/common.model';
import {getAllParent, getNodeByValue, getNodesByList} from '../../../../core/utils/util-component';
import {urls} from '../../../../core/urls.model';
import {UtilService} from '../../../../core/utils/util.service';
import {NzDropdownContextComponent, NzDropdownService, NzMessageService, NzModalService, NzTreeComponent} from 'ng-zorro-antd';
import {CoreService} from '../../../../core/core.service';

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
  @Output() changeDropdown = new EventEmitter();
  @Output() afterSearch = new EventEmitter();
  dropdown: NzDropdownContextComponent;
  activedNode; // 当前激活的node
  menus = [];
  menuList = [];
  url = urls.menu;
  expandKeys = [];
  resetExpandKeys = true;
  constructor(
    private util: UtilService,
    private dropdownService: NzDropdownService,
    private modal: NzModalService,
    private message: NzMessageService,
    private core: CoreService
  ) { }

  ngOnInit() {
    this.searchMenuList();
    this.core.menuTreeEvent.subscribe(event => {
      this.searchMenuList(event.type, event.code, event.node);
      // if (event.type === 'REFRESH') {
      //   if (event.resetExpandKeys) {
      //     this.resetExpandKeys = true;
      //   }
      //   this.searchMenuList(true);
      // } else if (event.type === 'ACTIVENODE') {
      //   this.activeNode(event.node);
      // } else if (event.type === 'RESETEXPANDKEYS') {
      //   this.expandKeys = event.expandKeys;
      // } else if (event.type === 'addSub') {
      //   this.searchMenuList(event.type, event.code, event.node);
      // }
    });
  }
  searchMenuList(eventType?, eventCode?, eventNode?) {
    this.util.get(urls.menu, getSql(urls.menu.url, AJAXTYPE.GET)).subscribe((res: HttpRes) => {
      if (res.code === 200) {
        if (this.isCustom) {
          this.menus = getNodesByList(res.data.results[0]);
        } else {
          this.menus = getNodesByList(res.data.results[0].filter(item => !item.issubordinate));
        }
        // 将根节点展开，只在初始化时展开
        if (this.resetExpandKeys) {
          this.resetExpandKeys = false;
          this.expandKeys = res.data.results[0].filter(item => !item.pid).map(item => item.id);
        } else {
          this.expandKeys = [...this.expandKeys];
          console.log('编辑keys', this.expandKeys);
        }
        // if (isAfterSearch) {
        //   this.afterSearch.emit({nodes: this.menus});
        // }
        if (eventType === 'addSub') {
          this.activeNode(getNodeByValue(this.menus, eventCode, 'code'));
          this.expandKeys = getAllParent(this.activedNode).map(item => item.key);
        } else if (eventType === 'edit') {
          this.activeNode(eventNode);
          this.expandKeys = [...getAllParent(this.activedNode), ...(eventNode.children && eventNode.children.length ? [eventNode] : [])].map(item => item.key);
        }
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
  clickNode(nodeEvent) {
    this.activeNode(nodeEvent.node);
  }
  contextMenu($event, template, node) {
    this.activeNode(node);
    this.dropdown = this.dropdownService.create($event, template);
  }
  selectDropdown(opType) {
    if (opType === 'delete') {
      this.modal.confirm({
        nzTitle: '确认删除？',
        nzOnOk: () => {
          const params = {
            psubordinateid: this.activedNode.parentNode.origin.subordinateid,
            issubordinate: this.activedNode.origin.issubordinate,
            id: this.activedNode.key,
            pid: this.activedNode.parentNode.key
          };
          this.util.delete(this.url, {
            ...params,
            ...getSql(this.url.url, AJAXTYPE.DELETE, params)
          }).subscribe((res: HttpRes) => {
            if (res.code === 200) {
              this.message.success('删除成功');
              this.expandKeys = [...this.expandKeys];
              this.searchMenuList();
              this.activeNode(this.activedNode.parentNode);
            }
          });
        }
      });
    } else {
      this.changeDropdown.emit({activedNode: this.activedNode, opType});
    }
    this.dropdown.close();
  }
  activeNode(node) {
    // 将所有选中了的节点全部置为未选中状态
    this.nzTree.getSelectedNodeList().forEach(item => item.isSelected = false);
    node.isSelected = true;
    this.activedNode = node;
    this.changeDropdown.emit({activedNode: this.activedNode, opType: 'view'});
    this.nzTree.nzTreeService.setSelectedNodeList(this.activedNode, false);
  }
  checkBoxChange() {
    this.getMenuList();
    this.changeCheckBox.emit(this.menuList);
  }
}
