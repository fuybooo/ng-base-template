import {Component, Input, OnInit} from '@angular/core';
import {AJAXTYPE, HttpRes} from '../../../../core/common.model';
import {guid} from '../../../../core/utils/util-fns';
import {CoreService} from '../../../../core/core.service';
import {getSql} from '../../../../core/utils/util-sql';
import {UtilService} from '../../../../core/utils/util.service';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-common-page',
  templateUrl: './common-page.component.html',
  styleUrls: ['./common-page.component.less']
})
export class CommonPageComponent implements OnInit {
  @Input() columns;
  @Input() url;
  @Input() addNavigateUrl;
  tableId = guid();
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
    this.router.navigateByUrl(this.addNavigateUrl);
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
