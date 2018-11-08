import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-html-css',
  templateUrl: './html-css.component.html',
  styleUrls: ['./html-css.component.less']
})
export class HtmlCssComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.init();
  }
  init() {
    const video: any = document.getElementById('example-video');
    console.log('获得video：', video);
    navigator.getUserMedia({video: true, audio: false}, function(stream) {
      console.log('摄像头获取成功');
      video.src = window.URL.createObjectURL(stream);
    }, function error(err) {
      console.log(err);
    });
  }

}
