import {EventEmitter, Injectable} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {filter, map} from 'rxjs/internal/operators';
import {langInfoKey, menuList} from './common.model';
import {environment} from '../../environments/environment';
import {TranslateService} from '@ngx-translate/core';
import {NzI18nService, zh_CN, en_US} from 'ng-zorro-antd';

@Injectable()
export class CoreService {
  spin = false;
  // 路由改变事件
  routeChangeEvent = new EventEmitter();
  // 全局列表
  globalTableEvent = new EventEmitter();
  // 全局表单
  globalFormEvent = new EventEmitter();
  // 全局页面高度变化时触发
  pageHeightEvent = new EventEmitter();
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private translateService: TranslateService,
    private nzI18nService: NzI18nService,
  ) { }
  static getDefaultLang() {
    const localLang = localStorage.getItem(langInfoKey);
    const lang = localLang || environment.lang;
    if (lang !== localLang) {
      CoreService.setDefaultLang(lang);
    }
    return lang;
  }
  static setDefaultLang(lang) {
    localStorage.setItem(langInfoKey, lang);
  }
  /**
   * 对路由进行监听
   * ==
   * 1. 改变页面对title
   * 2. 路由改变后可以订阅事件，做相应对改变
   */
  watchRoute() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter(route => route.outlet === 'primary')
    ).subscribe((route) => {
      // route.snapshot.data['title'] ||
      // this.titleService.setTitle(route.snapshot.data['title']);
      // 找到对应的路由
      const component = menuList.find(menu => menu.route === this.router.routerState.snapshot.url);
      if (component) {
        this.titleService.setTitle(component.label + ' - 标题');
      } else {
        this.titleService.setTitle('网页标题');
      }
      this.routeChangeEvent.emit();
    });
  }
  initTranslateConfig() {
    const lang = CoreService.getDefaultLang();
    this.translateService.addLangs(['zh', 'en']);
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
    let langFile;
    switch (lang) {
      case 'zh':
        langFile = zh_CN;
        break;
      case 'en':
        langFile = en_US;
        break;
    }
    this.nzI18nService.setLocale(langFile);
  }
  logout() {
    this.router.navigate(['/login']);
  }
}
