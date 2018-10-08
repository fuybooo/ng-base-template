import { Component, OnInit } from '@angular/core';
import {urls} from '../../../core/urls.model';
import {guid} from '../../../core/utils/util-fns';
import {Column} from '../../../shared/component/table/table.model';
import {CoreService} from '../../../core/core.service';
import {Router} from '@angular/router';
import {UtilService} from '../../../core/utils/util.service';
import {AJAXTYPE, HttpRes} from '../../../core/common.model';
import {NzMessageService} from 'ng-zorro-antd';
import {getSql} from '../../../core/utils/util-sql';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.less']
})
export class PermissionComponent implements OnInit {
  tableId = guid();
  columns: Column[] = [
    {
      field: 'name',
      title: '名称',
      sortable: true
    },
    {
      field: 'description',
      title: '描述'
    },
    {
      event: ['edit', 'delete'],
      text: ['编辑', '删除'],
      link: '/main/permission'
    }
  ];
  url = urls.permission;
  checkedList = [];
  constructor(
    private core: CoreService,
    private router: Router,
    private util: UtilService,
    private message: NzMessageService
  ) { }

  ngOnInit() {
  }

  /**
   * 监听搜索框值的变化进行搜索
   * 索索关键字变化之后直接进行搜索会导致请求频繁，和响应不按顺序。比如我先搜素1，响应时间为2s，再搜索12响应时间为0.1s则会导致我输入完12后，得到的结果确实1的搜索结果
   * 为了解决上述两个问题，需要使用rxjs中的两个方法 switchMap和debounce
   * @param value
   */
  search(value = '') {
    this.core.globalTableEvent.emit({
      tableId: this.tableId,
      isNeedSearchChange: true,
      params: {kw: value}
    });
  }
  add() {
    this.router.navigateByUrl('/main/permission/add');
  }
  del(id?) {
    const params = {idList: id ? [id] : this.checkedList.map(item => item.id)};
    this.util.delete(this.url,
      {
        ...params,
        ...getSql(this.url.url, AJAXTYPE.DELETE, params)
      },
      ).subscribe((res: HttpRes) => {
      if (res.code === 200) {
        this.message.success('删除成功');
        this.search();
      }
    });
  }
  eventChange(event) {
    if (event.tableId === this.tableId) {
      if (event.event === 'delete') {
        this.del(event.data.id);
      }
    }
  }
  refreshStatusChange(event) {
    if (event.tableId === this.tableId) {
      this.checkedList = event.dataSet.filter(item => item.checked);
    }
  }
}
