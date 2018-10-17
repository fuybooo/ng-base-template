import {Component, OnInit} from '@angular/core';
import {CoreService} from './core/core.service';
declare let $: any;

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(
    private core: CoreService,
    ) {}
  ngOnInit() {
    this.core.watchRoute();
    this.core.initTranslateConfig();
    this.changeBoxSize();
    $(window).resize(() => this.changeBoxSize());
  }
  changeBoxSize() {
    console.log('当前文档的高度', $(document).height());
  }
}
