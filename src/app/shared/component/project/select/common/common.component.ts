import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {urls} from '../../../../../core/urls.model';
import {UtilService} from '../../../../../core/utils/util.service';
import {BehaviorSubject} from 'rxjs';
import {debounceTime, switchMap} from 'rxjs/internal/operators';
import {HttpRes} from '../../../../../core/common.model';

@Component({
  selector: 'app-select-common',
  templateUrl: './common.component.html',
})
export class CommonComponent implements OnInit {
  @Input() nzValue = 'id';
  @Input() nzLabel = 'fn-user';
  @Input() extLabelField = ''; // 额外的数据
  @Input() valueKey = 'search';
  @Input() url;
  @Input() selectedItem;
  @Output() selectedItemChange = new EventEmitter();
  @Output() extLabelFieldChange = new EventEmitter();
  list = [];
  searchChange$ = new BehaviorSubject('');
  constructor(
    private utilService: UtilService
  ) { }

  ngOnInit() {
    // 订阅搜索事件
    this.subSearch();
    // 初次搜索
    this.onSearch();
  }
  subSearch() {
    const getList = (value: string) => this.utilService.get(this.url, {[this.valueKey]: value}, {pageNumber: 1, pageSize: 10});
    this.searchChange$.asObservable().pipe(debounceTime(500)).pipe(switchMap(getList)).subscribe((res: HttpRes) => {
      if (res.code === 200 || res.code === 0) {
        this.list = res.data.result || res.data.results;
      }
    });
  }
  onSearch(value?) {
    this.searchChange$.next(value);
  }
  getNzLabel(o) {
    if (!o) {
      return null;
    }
    if (this.nzLabel.startsWith('fn-')) {
      if (this.nzLabel === 'fn-user') {
        return o.displayname + '（' + o.username + '）';
      }
    }
    return o[this.nzLabel];
  }
  onChange(value) {
    this.selectedItemChange.emit(value);
    if (this.extLabelField) {
      this.extLabelFieldChange.emit(this.list.find(l => l[this.nzValue] === value)[this.extLabelField]);
    }
  }
}
