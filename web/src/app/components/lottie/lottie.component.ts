import { Component, Input, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';

@Component({
  selector: 'lottie',
  templateUrl: './lottie.component.html',
  styleUrls: ['./lottie.component.scss'],
})
export class LottieComponent {
  options;

  animationCreated(animationItem: AnimationItem): void {}
  ngOnInit() {
    this.options = {
      path: `../../../assets/load.json`,
    };
  }
}
