import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {getNodesByList} from '../core/utils/util-component';
import {CoreService} from '../core/core.service';
import {getMatchedNavMenu} from '../core/utils/util-project';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {
  menuTree: any[];
  crtNav: any;
  crtMenu;
  crtUrl;
  subordinateList = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private core: CoreService
  ) { }

  ngOnInit() {
    // 从resolve守卫中获取当前用户的菜单信息
    this.route.data.subscribe((res: any) => {
      this.subordinateList = res.menu.filter(item => item.issubordinate === 1);
      this.getMenuMap(res.menu.filter(item => item.issubordinate !== 1));
    });
    this.core.routeChangeEvent.subscribe(() => {
      this.initNav();
      this.initMenu();
    });
  }
  initNav() {
    this.crtUrl = this.router.routerState.snapshot.url;
    const {crtNav, crtMenu} = getMatchedNavMenu(this.crtUrl, this.menuTree, this.subordinateList);
    this.crtNav = crtNav;
    this.menuTree.forEach(nav => nav.isActive = nav === this.crtNav);
    this.crtMenu = crtMenu;
    this.titleService.setTitle(crtMenu.name);
  }
  initMenu() {
    // 设置当前菜单的 expand 和 isActive
    for (let mI = 0, mL = this.crtNav.children.length; mI < mL; mI ++) {
      const menu: any = this.crtNav.children[mI];
      if (menu.children && menu.children.length) {
        menu.expand = false; // 初始化展开状态
        for (let sI = 0, sL = menu.children.length; sI < sL; sI ++) {
          const sub: any = menu.children[sI];
          sub.isActive = false; // 初始化激活状态
          if (sub.origin.code === this.crtMenu.code) {
            sub.isActive = true;
            menu.expand = true;
          }
        }
      } else {
        menu.isActive = menu.origin.code === this.crtMenu.code;
      }
    }
  }
  /**
   * 将扁平的菜单数据转化为树
   * @type {any[]}
   */
  getMenuMap(menuList) {
    this.menuTree = getNodesByList(menuList.filter(item => item.code));
    this.initNav();
    this.initMenu();
  }

  /**
   * 切换导航
   * @param nav
   */
  changeNav(nav) {
    this.crtNav = nav;
    this.menuTree.forEach(n => n.isActive = n === this.crtNav);
    this.router.navigateByUrl(`${nav.origin.route}${nav.origin.params || ''}`);
  }

  /**
   * 切换菜单
   * @param menu
   */
  onClickMenuItem(menu) {
    // 切换菜单时直接跳转路由
    this.router.navigateByUrl(`${menu.origin.route}${menu.origin.params || ''}`);
  }
  logout() {
    this.router.navigateByUrl('index');
  }
}
