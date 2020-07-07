import { Component } from '@angular/core';
import { Service } from './services/service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'lista-de-tarefas';
  signed;
  constructor(private service: Service) {}
  ngOnInit(): void {
    this.signed = this.service.signed;
    this.service.getSigned().subscribe((value) => {
      this.signed = value;
    });
  }
}
