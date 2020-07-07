import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Service } from '../../services/service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-logon',
  templateUrl: './logon.component.html',
  styleUrls: ['./logon.component.scss'],
})
export class LogonComponent implements OnInit {
  form: FormGroup;
  visible = false;
  typeForm = ['Cadastrar', 'Entrar'];
  typeFormSelected = 'Entrar';
  constructor(
    private formBuilder: FormBuilder,
    private service: Service,
    private router: Router
  ) {
    if (this.service.signed) this.router.navigate(['/home']);
  }
  onSubmit() {
    const { value } = this.form;
    let message = 'Usuário não autorizado';
    if (value.name !== undefined) message = 'Usuário já cadastrado';
    this.service.userManagement(value).subscribe(
      (success) => {
        if (value.name !== undefined) {
          Swal.fire({
            icon: 'success',
            title: 'Usuario cadastrado com sucesso',
            showConfirmButton: false,
            timer: 1500,
          });
          this.onChangeForm('Entrar');
        } else {
          this.service.setUserLogin(success);
        }
        this.form.reset();
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }
  onChangeVisible() {
    this.visible = !this.visible;
  }
  onChangeForm(value) {
    this.typeFormSelected = value;
    this.visible = false;
    this.form.reset({
      name: { value: '', disabled: value === 'Cadastrar' ? false : true },
    });
  }

  forgotPassword() {
    Swal.fire({
      title: 'Digite seu email para receber a senha.',
      input: 'email',
      inputPlaceholder: 'Digite seu email',
    })
      .then((email) => {
        this.service.forgotPassword(email.value).subscribe(
          () => {
            Swal.fire({
              icon: 'success',
              title: 'Email com sua senha foi enviado.',
              showConfirmButton: false,
              timer: 2000,
            });
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Nenhum usuário com esse email.',
              showConfirmButton: false,
              timer: 2000,
            });
          }
        );
      })
      .catch(() => {});
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      name: [null, Validators.required],
    });
    this.form.get('name').disable();
  }
}
