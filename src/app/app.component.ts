import {Component, OnInit} from '@angular/core';
import {CoreService} from './core/core.service';

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
  }
}
