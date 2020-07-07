import { Component, OnInit } from "@angular/core";

@Component({
  selector: "button-top",
  templateUrl: "./button-top.component.html",
  styleUrls: ["./button-top.component.scss"],
})
export class ButtonTopComponent implements OnInit {
  positionTop: any = 0;

  constructor() {}
  setPosition(event: Window) {
    this.positionTop = window.scrollY;
  }
  goTop() {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }
  ngOnInit(): void {}
}
