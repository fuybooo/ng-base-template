import { Component, OnInit } from '@angular/core';
import {NUM_W, NUM_H, COL_W, NUM_LIST, COLORS} from './time.model';
declare let $: any;
let counter = 0;
@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.less']
})
export class TimeComponent implements OnInit {
  W; // 容器宽度
  H; // 容器高度
  R; // 球的半径
  T = 60; // 数字距离画布顶端的距离
  L; // 数字距离画布左边的距离
  NUM_W; // 数字宽度
  COL_W; // 冒号宽度
  L_LIST; // 各个元素左侧偏移集合
  cxt; // canvas上下文
  ballList = []; // 坠落的小球数组
  crtTime;
  constructor() { }
  static getCurrentTime() {
    const date = new Date();
    const dateMap = {
      hh: ('0' + date.getHours()).slice(-2),
      mm: ('0' + date.getMinutes()).slice(-2),
      ss: ('0' + date.getSeconds()).slice(-2),
    };
    return [
      dateMap.hh[0],
      dateMap.hh[1],
      'C',
      dateMap.mm[0],
      dateMap.mm[1],
      'C',
      dateMap.ss[0],
      dateMap.ss[1],
    ];
  }
  static getColor() {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
  }
  ngOnInit() {
    this.initData();
    setInterval(() => {
      counter ++;
      this.render();
      this.update();
    }, 50);
  }
  initData() {
    const canvas = $('#js-time-canvas')[0];
    this.W = canvas.width = $(document).width() - 200 - 40;
    this.H = canvas.height = $(document).height() - 50 - 36 - 40 - 34;
    this.R = this.W / 36 / 5 - 1;
    this.NUM_W = (2 * NUM_W + 1) * (this.R + 1);
    this.COL_W = (2 * COL_W + 1) * (this.R + 1);
    this.L = this.W / 5;
    this.L_LIST = [
      this.L,
      this.L + this.NUM_W,
      this.L + 2 * this.NUM_W,
      this.L + 2 * this.NUM_W + this.COL_W,
      this.L + 3 * this.NUM_W + this.COL_W,
      this.L + 4 * this.NUM_W + this.COL_W,
      this.L + 4 * this.NUM_W + 2 * this.COL_W,
      this.L + 5 * this.NUM_W + 2 * this.COL_W,
    ];
    this.cxt = canvas.getContext('2d');
    this.crtTime = TimeComponent.getCurrentTime();
  }
  render() {
    // 清空
    this.cxt.clearRect(0, 0, this.W, this.H);
    this.cxt.fillStyle = '#eb2f96';
    for (let i = 0, l = this.L_LIST.length; i < l; i ++) {
      const left = this.L_LIST[i];
      const shape = NUM_LIST[this.crtTime[i]];
      for (let j = 0; j < NUM_H; j ++) {
        for (let k = 0; k < NUM_W; k ++) {
          const item = shape[j][k];
          if (item === '1') {
            this.cxt.beginPath();
            this.cxt.arc(left + (k * 2 + 1) * (this.R + 1), this.T + (j * 2 + 1) * (this.R + 1), this.R, 0, 2 * Math.PI);
            this.cxt.closePath();
            this.cxt.fill();
          }
        }
      }
    }
    for (let i = 0, l = this.ballList.length; i < l; i ++) {
      const item = this.ballList[i];
      this.cxt.fillStyle = item.color;
      this.cxt.beginPath();
      this.cxt.arc(item.x, item.y, this.R, 0, 2 * Math.PI);
      this.cxt.closePath();
      this.cxt.fill();
    }
  }
  update() {
    const now = TimeComponent.getCurrentTime();
    if (now[7] !== this.crtTime[7]) {
      for (let i = 0; i < this.L_LIST.length; i++) {
        if (i !== 2 && i !== 5) {
          if (now[i] !== this.crtTime[i]) {
            this.addBalls(this.L_LIST[i], now[i]);
          }
        }
      }
      this.crtTime = now;
    }
    this.updateBalls();
  }
  addBalls(left, timeIndex) {
    for (let i = 0; i < NUM_H; i ++) {
      for (let j = 0; j < NUM_W; j ++) {
        const item = NUM_LIST[timeIndex][i][j];
        if (item === '1') {
          this.ballList.push({
            x: left + (j * 2 + 1) * (this.R + 1),
            y: this.T + (i * 2 + 1) * (this.R + 1),
            g: 1.5 + Math.random(),
            vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
            vy: -5,
            color: TimeComponent.getColor()
          }, {
            x: left + (j * 2 + 1) * (this.R + 1) + (Math.random() < 0.5 ? -1 : 1) * this.R,
            y: this.T + (i * 2 + 1) * (this.R + 1) + (Math.random() < 0.5 ? -1 : 1) * this.R,
            g: 2 + Math.random() * (Math.random() < 0.5 ? -1 : 1),
            vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
            vy: -8,
            color: TimeComponent.getColor()
          });
        }
      }
    }
  }
  updateBalls() {
    for (let i = 0, l = this.ballList.length; i < l; i ++) {
      const item = this.ballList[i];
      item.x += item.vx;
      item.y += item.vy;
      item.vy += item.g;
      if (item.y >= this.H - this.R) {
        item.y = this.H - this.R;
        item.vy = - item.vy * 0.75;
      }
    }
    let count = 0;
    for (let i = 0, l = this.ballList.length; i < l; i ++) {
      const item = this.ballList[i];
      if (item.x + this.R > 0 && item.x - this.R < this.W) {
        this.ballList[count ++] = this.ballList[i];
      }
    }
    while (this.ballList.length > Math.min(2000, count)) {
      this.ballList.pop();
    }
  }
}
