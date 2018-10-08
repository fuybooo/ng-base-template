import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {getHref} from '../table.model';

@Component({
  selector: 'app-table-cell',
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.less'],
})
export class TableCellComponent implements OnInit {
  @Input() col;
  @Input() data;
  @Input() tableService;
  @Input() eventChange;
  @Input() tableId;

  popVisible = false;
  delPopVisible = false;
  checkQuestionHandleOptions = [
    {
      label: '在线消息', value: 1
    },
    {
      label: '邮件', value: 2
    },
  ];
  emitEvent = (col, data, event, extract = {}) => {
    if (event === 'view' || event === 'edit') {
      // 查看，编辑，等跳转路由等操作直接在此处理
      this.router.navigateByUrl(getHref(col, data, event));
    } else {
      // 执行删除等操作
      this.eventChange.emit({tableId: this.tableId, col, data, event, ...extract});
    }
  }
  constructor(private router: Router) {}
  ngOnInit() {
  }
  isNotString(value) {
    return typeof value !== 'string';
  }
  getFormatText(col, data) {
    return col.formatter(data[col.field || data[col.key]], data);
  }
  handlePopoverValueCancel() {
    this.popVisible = false;
    this.delPopVisible = false;
  }
  handlePopoverValueOk(col, data, event) {
    this.emitEvent(col, data, event, {checkQuestionHandleOptions: this.checkQuestionHandleOptions});
    this.popVisible = false;
    this.delPopVisible = false;
  }
  hasPermission(type) {
    // 当前权限是否应该展示该按钮
    // if (type === 'changeRate') {
    //   return getLoginInfo().role === '2';
    // }
    return false;
  }
  shouldVisible(data, visibleField, visibleValueList) {
    return visibleValueList.some(v => v === data[visibleField]);
  }
}
