import { Component, OnInit } from '@angular/core';
declare let $: any;
declare let html2canvas: any;
interface ListConfig {
  list: any[];
  sort: number;
  code: string;
  name: string;
}
@Component({
  selector: 'app-drag',
  templateUrl: './drag.component.html',
  styleUrls: ['./drag.component.less']
})
export class DragComponent implements OnInit {
  listArray: ListConfig[] = [];
  constructor() { }

  ngOnInit() {
    this.init();
  }
  init() {
    this.listArray.push({
      list: [
        {
          id: '1',
          owner: 'sungq',
          content: '单据详情修改',
          deadline: 1540797272963
        },
        {
          id: '2',
          owner: 'sungq',
          content: '单据详情新增',
          deadline: 1540799272963
        },
        {
          id: '3',
          owner: 'sungq',
          content: '单据详情删除',
          deadline: 1540712272963
        },
      ],
      sort: 1,
      code: 'todoList',
      name: 'Todo List'
    }, {
      list: [
        {
          id: '1',
          owner: 'sungq',
          content: '单据详情修改2',
          deadline: 1540797272963
        },
        {
          id: '2',
          owner: 'sungq',
          content: '单据详情新增2',
          deadline: 1540799272963
        },
        {
          id: '3',
          owner: 'sungq',
          content: '单据详情删除2',
          deadline: 1540712272963
        },
      ],
      sort: 2,
      code: 'todoList',
      name: 'Todo List'
    });
  }
  clickMore() {}
  drag(event, item, listItem, type, evType) {
    switch (evType) {
      case 'dragstart':
        // 开始拖拽，需要将该元素从其所在list移除
        // listItem.list = [...listItem.list.filter(l => l.id !== item.id)];
        // this.createCursorStyle();
        // const node = event.target.cloneNode(true);
        // html2canvas(node).then(c => {
        //   const image = new Image();
        //   image.src = c.toDataURL('image/png');
        //   event.dataTransfer.setDragImage(image, 10, 10);
        // });
        //
        // event.dataTransfer.effectAllowed = 'copy';
        break;
      case 'dragend':
        // this.removeCursorStyle();
        break;
      case 'dragenter':
        break;
      case 'dragover':
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
        break;
    }
  }
  createCursorStyle() {
    const tag = document.getElementById('cursorStyle');
    if (!tag) {
      const style = document.createElement('style');
      style.id = 'cursorStyle';
      style.innerHTML = '* {cursor: move !important;}';
      document.body.appendChild(style);
    }
  }
  removeCursorStyle() {
    const tag = document.getElementById('cursorStyle');
    if (tag) {
      document.body.removeChild(tag);
    }
  }
}
