import {Component, OnInit} from '@angular/core';
import {CoreService} from './core/core.service';
import {HEADER_HEIGHT, NAV_HEIGHT} from './core/common.model';
declare let $: any;

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  timer;
  constructor(
    private core: CoreService,
    ) {}
  ngOnInit() {
    this.core.watchRoute();
    this.core.initTranslateConfig();
    this.changeBoxSize();
    this.core.pageHeightEvent.subscribe(() => this.changeBoxSize());
    $(window).resize(() => this.changeBoxSize());
  }
  changeBoxSize() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      console.log('当前文档的高度', $(document).height());
      $('.js-main-side').height($(document).height() - HEADER_HEIGHT - NAV_HEIGHT - 1);
    }, 200);
  }
}
