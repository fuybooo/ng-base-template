import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Column} from './table.model';
import {TableService} from './table.service';
import {CoreService} from '../../../core/core.service';
import {AJAXTYPE} from '../../../core/common.model';
import {BehaviorSubject} from 'rxjs';

/**
 * app-table组件，只适用于没有任何自定义事件的表格
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
  providers: [TableService]
})
export class TableComponent implements OnInit, OnDestroy {
  @Input() url;
  @Input() params: any = {};
  @Input() columns: Column[] = [];
  @Input() dataSet = [];
  @Input() showPagination = true;
  @Input() isCheckbox = true; // 是否显示多选
  @Input() isRadio = false; // 是否显示单选
  @Input() isSortCol = false; // 是否显示序号
  @Input() key = 'id'; // 数据的主键
  @Input() tableSize = 'small';
  @Input() tableId; // 表格的唯一标识
  @Input() selectDefault; // 让数据中的flag字段值为1的数据默认变为选中状态
  @Input() resultKey = 'results'; // 返回结果中list数据的key
  @Input() specialTableType; // 特殊的表格 -- 返回数据之后需要对数据进行特殊处理的情况
  @Input() reqType = AJAXTYPE.GET; // 请求方式 默认为get
  @Input() isNeedSearchChange = false; // 如果是响应查询变化的表格，该变量的初始值为true
  @Output() refreshStatusChange = new EventEmitter(); // 改变选中状态时发射事件
  @Output() afterSearch = new EventEmitter(); // 完成查询时发射事件
  @Output() eventChange = new EventEmitter(); // 自定义事件
  notFetchConfig; // 在使用url的情况下不加载远程数据 使用该config对数据进行更新 默认值为undefined
  total;
  searchChange$ = new BehaviorSubject('');
  subscript;
  constructor(
    public tableService: TableService,
    public coreService: CoreService,
  ) {}

  ngOnInit() {
    this.initTable();
    // 初始化时 isNeedSearchChange 为false；第一次加载数据。
    if (this.isNeedSearchChange) {
      // 监听之后，初始化搜索框的时候会执行一次查询
      this.tableService.initSearchChange(this.searchChange$);
    } else {
      this.tableService.searchTable();
    }
    /* 订阅全局的表格事件 */
    this.subscript = this.coreService.globalTableEvent.subscribe((event: any) => {
      if (event.tableId && event.tableId === this.tableId) {
        if (event.params) {
          this.params = event.params;
        }
        if (event.dataSet) {
          this.dataSet = event.dataSet;
        }
        if (event.url) {
          this.url = event.url;
        }
        if (event.notFetchConfig) {
          // 此时需要在本地配置表格数据
          this.notFetchConfig = event.notFetchConfig;
          this.dataSet = this.tableService.dataSet;
          this.total = this.tableService.total;
        } else {
          this.notFetchConfig = undefined;
          this.total = undefined;
        }
        if (event.columns) {
          this.columns = event.columns;
        }
        if (event.resultKey) {
          this.resultKey = event.resultKey;
        }
        // 查询表格时判断是否需要进行节流时序控制
        this.isNeedSearchChange = event.isNeedSearchChange;
        // 如果 isNeedSearchChange 为true，则更新table参数但不进行查询 否则直接查询
        this.initTable();
        // 当isNeedSearchChange 为true时，发送事件
        if (this.isNeedSearchChange) {
          this.tableService.loading = true;
          this.searchChange$.next('');
        } else {
          this.tableService.searchTable();
        }
      }
    });
  }
  ngOnDestroy() {
    if (this.subscript) {
      this.subscript.unsubscribe();
    }
  }
  initTable() {
    this.tableService.initTable({
      url: this.url,
      params: this.params,
      columns: this.columns,
      dataSet: this.dataSet,
      showPagination: this.showPagination,
      isCheckbox: this.isCheckbox,
      isRadio: this.isRadio,
      isSortCol: this.isSortCol,
      key: this.key,
      resultKey: this.resultKey,
      tableSize: this.tableSize,
      tableId: this.tableId,
      total: this.total,
      reqType: this.reqType,
      selectDefault: this.selectDefault,
      notFetchConfig: this.notFetchConfig,
      refreshStatusChange: this.refreshStatusChange,
      afterSearch: this.afterSearch,
      eventChange: this.eventChange,
      specialTableType: this.specialTableType,
      searchChange$: this.searchChange$,
      isNeedSearchChange: this.isNeedSearchChange,
    });
  }
}
