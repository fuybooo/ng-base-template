import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less'],
})
export class SearchComponent {
  @Output() searchWordChange = new EventEmitter();
  @Output() search = new EventEmitter();
  @Input() placeholder = '输入关键字进行搜索...';
  @Input() searchWord = '';
  doSearch(searchInput, clear = false) {
    searchInput.focus();
    if (clear) {
      this.searchWord = '';
    }
    this.search.emit(this.searchWord);
  }
  changeSearchWord(value) {
    this.search.emit(value);
  }
}
