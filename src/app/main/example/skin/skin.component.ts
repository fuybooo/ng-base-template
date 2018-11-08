import {ChangeDetectorRef, Component, Inject, NgZone, OnInit} from '@angular/core';
import {COLORS} from './skin.model';
import {NzMessageService} from 'ng-zorro-antd';
import {LazyService} from '@delon/util';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-skin',
  templateUrl: './skin.component.html',
  styleUrls: ['./skin.component.less']
})
export class SkinComponent implements OnInit {
  colors = COLORS;
  color;
  timer;
  loadedLess;
  constructor(
    private zone: NgZone,
    private cd: ChangeDetectorRef,
    private message: NzMessageService,
    private lazy: LazyService,
    @Inject(DOCUMENT) private doc: any
  ) { }

  ngOnInit() {
    this.initColor();
  }
  initColor() {
    const node = document.createElement('link');
    node.rel = 'stylesheet/less';
    node.type = 'text/css';
    node.href = '/assets/less/default.less';
    document.getElementsByTagName('head')[0].appendChild(node);
  }
  apply(c?) {
    const allColors = this.colors.map(item => item.arr.join()).join().split(',');
    this.color = c || allColors[Math.ceil(allColors.length * Math.random())];
    console.log(this.color);
    const msgId = this.message.loading('正在编译主题！', {nzDuration: 0}).messageId;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      const changeColor = () => {
        (window as any).less.modifyVars({
          '@primary-color': this.color
        }).then(() => {
          this.message.remove(msgId);
          this.message.success('应用成功');
        });
      };
      if (this.loadedLess) {
        changeColor();
      } else {
        (window as any).less = {
          async: true
        };
        new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/less.js/2.7.2/less.min.js';
          script.onload = resolve;
          script.onerror = reject;
          this.doc.head.appendChild(script);
        }).then(() => {
          this.loadedLess = true;
          changeColor();
        });
      }
    }, 300);
  }
}
