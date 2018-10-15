import { Component, OnInit } from '@angular/core';
import {urls} from '../../../../core/urls.model';
import {Column} from '../../../../shared/component/table/table.model';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.less']
})
export class PermissionComponent implements OnInit {
  columns: Column[] = [
    {
      field: 'name',
      title: '名称',
      sortable: true
    },
    {
      field: 'description',
      title: '描述'
    },
    {
      event: ['edit', 'delete'],
      text: ['编辑', '删除'],
      link: '/main/permission/info'
    }
  ];
  url = urls.permission;
  addNavigateUrl = '/main/permission/info/add';
  constructor(
  ) { }

  ngOnInit() {
  }
}
