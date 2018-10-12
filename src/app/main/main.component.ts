import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {getNodesByList} from '../core/utils/util-component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {
  menuTree: any[];
  crtNav;
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // 从localStorage中获取用户信息，根据用户信息显示用户应该看到的菜单
    this.route.data.subscribe((res: any) => {
      this.getMenuMap(res.menu);
    });
  }
  getMenuMap(menuList) {
    this.menuTree = getNodesByList(menuList.filter(item => item.code));
    this.crtNav = this.menuTree[0];
    console.log('tree:', this.menuTree);
  }
  changeNav(nav) {

  }
  onClickMenuItem(menu) {

  }
  logout() {
    this.router.navigateByUrl('index');
  }
}
