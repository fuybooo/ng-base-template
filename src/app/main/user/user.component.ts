import { Component, OnInit } from '@angular/core';
import {Column} from '../../shared/component/table/table.model';
import {urls} from '../../core/urls.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {
  columns: Column[] = [
    {
      field: 'name',
      title: '姓名',
      sortable: true
    },
    {
      field: 'loginname',
      title: '登录账号'
    },
    {
      event: ['edit', 'delete'],
      text: ['编辑', '删除'],
      link: '/main/user/info'
    }
  ];
  url = urls.user;
  addNavigateUrl = '/main/user/info/add';
  constructor() { }

  ngOnInit() {
  }

}
