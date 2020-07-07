import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Service } from '../../services/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  options = [
    { title: 'Home', slug: '/home' },
    { title: 'Cadastrar', slug: '/register' },
  ];
  user;
  constructor(private serviceApi: ApiService, private service: Service) {}
  logout() {
    Swal.fire({
      title: 'Você realmente deseja sair?',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sair',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.service.logout();
      }
    });
  }
  ngOnInit(): void {
    this.user = this.service.getUser();
  }
}
