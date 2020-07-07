import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Service } from 'src/app/services/service.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, empty, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import { Observable } from 'rxjs'

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  tasks$: Observable<any[]>;
  currenDate = new Date();
  valor = [];
  constructor(
    private serviceApi: ApiService,
    private service: Service,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  compareDate(date) {
    return (
      this.currenDate.toISOString().substr(0, 10) >
      date.split('/').reverse().join('-')
    );
  }
  onDelete(task) {
    Swal.fire({
      title: 'Você realmente deseja deletar esta tarefa?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Deletar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.serviceApi
          .deleteTask(this.service.getToken(), task.id)
          .subscribe((success) => {
            this.tasks$ = this.serviceApi.getTasks(this.service.getToken());
          });
        Swal.fire({
          icon: 'success',
          title: 'Tarefa deletada com sucesso',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }
  onChangeTask(task) {
    this.router.navigate(['/register', task.id], { relativeTo: this.route });
  }
  ngOnInit(): void {
    this.tasks$ = this.serviceApi.getTasks(this.service.getToken());
  }
}
