import { Component, OnInit } from '@angular/core';
import {Column} from '../../../../shared/component/table/table.model';
import {urls} from '../../../../core/urls.model';

@Component({
  selector: 'app-permission-user',
  templateUrl: './permission-user.component.html',
  styleUrls: ['./permission-user.component.less']
})
export class PermissionUserComponent implements OnInit {
  columns: Column[] = [
    {
      field: 'username',
      title: '用户',
      sortable: true
    },
    {
      field: 'loginname',
      title: '账号',
      sortable: true
    },
    {
      field: 'permission',
      title: '权限'
    },
    {
      field: 'description',
      title: '权限描述'
    },
    {
      event: ['edit', 'delete'],
      text: ['编辑', '删除'],
      link: '/main/permission-user/info'
    }
  ];
  url = urls.permissionUser;
  addNavigateUrl = '/main/permission-user/info/add';
  constructor() { }

  ngOnInit() {
  }

}
