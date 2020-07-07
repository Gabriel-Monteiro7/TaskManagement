import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { Service } from 'src/app/services/service.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  typeForm = ['Cadastrar', 'Editar'];
  typeFormSelected = 'Cadastrar';
  year: any = new Date();
  options = ['Muito alta', 'Alta', 'Média', 'Baixa'];
  optionsBoolean = [
    { title: 'Concluida', value: true },
    { title: 'Não concluida', value: false },
  ];
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private location: Location,
    private service: Service
  ) {}
  onSubmit() {
    let { value } = this.form;
    let message = 'Tarefa adicionada com sucesso';
    value.deadline = value.deadline.split('-').reverse().join('/');
    if (value.id !== null) message = 'Tarefa editada com sucesso';
    this.apiService
      .save(this.service.getToken(), value)
      .subscribe((success) => {
        Swal.fire({
          icon: 'success',
          title: message,
          showConfirmButton: false,
          timer: 1500,
        });
        this.location.back();
      });
  }
  updateForm(task) {
    this.form.patchValue({
      id: task.id,
      name: task.name,
      deadline: task.deadline.split('/').reverse().join('-'),
      priority: task.priority,
      description: task.description,
      completed: task.completed,
    });
  }
  ngOnInit(): void {
    this.year = this.year.toISOString().substr(0, 10);
    this.form = this.formBuilder.group({
      id: [null],
      name: [null, Validators.required],
      deadline: [null, Validators.required],
      priority: [null, Validators.required],
      description: [null, Validators.required],
      completed: [null],
    });
    this.route.params.subscribe((params: any) => {
      const id = params.id;
      console.log(id);

      if (id !== undefined) {
        const task = this.apiService
          .getTask(this.service.getToken(), id)
          .subscribe(
            (success) => {
              this.updateForm(success);
              this.typeFormSelected = 'Editar';
            },
            (error) => {
              Swal.fire({
                icon: 'error',
                title: 'Tarefa não existe',
                showConfirmButton: false,
                timer: 1500,
              }).then(() => {
                this.router.navigate(['/']);
              });
            }
          );
      }
    });
  }
}
