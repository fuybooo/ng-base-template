import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    // 从localStorage中获取用户信息，根据用户信息显示用户应该看到的菜单
  }
  logout() {
    this.router.navigateByUrl('index');
  }
}
