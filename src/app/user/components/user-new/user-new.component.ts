import { CREATE_USER } from './../../../client/user/mutations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { IUser } from '../../shared/models/user.model';
import { GET_USERS } from 'src/app/client/user/queries';
import { addUserAction } from 'src/app/store/actions/user.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css'],
})
export class UserNewComponent implements OnInit {
  user: IUser = {
    id: '',
    nombre: '',
    apellidoMaterno: '',
    apellidoPaterno: '',
    telefono: '',
    direccion: {
      calle: '',
      numero: '',
      ciudad: '',
      estado: '',
    },
  };
  userStore!: Observable<any>;
  userForm: FormGroup = new FormGroup({});
  directionForm: FormGroup = new FormGroup({});
  constructor(
    protected router: Router,
    private formbuilder: FormBuilder,
    private apollo: Apollo,
    private _snackBar: MatSnackBar,
    private store: Store<{ users: any }>
  ) {}

  ngOnInit(): void {
    this.userForm = this.formbuilder.group({
      nombre: [this.user.nombre, Validators.required],
      apellidoMaterno: [this.user.apellidoMaterno, [Validators.required]],
      apellidoPaterno: [this.user.apellidoPaterno, [Validators.required]],
      telefono: [this.user.telefono, [Validators.required]],
    });
    this.directionForm = this.formbuilder.group({
      calle: [this.user.direccion.calle, [Validators.required]],
      ciudad: [this.user.direccion.ciudad, [Validators.required]],
      numero: [this.user.direccion.numero, [Validators.required]],
      estado: [this.user.direccion.estado, [Validators.required]],
    });
  }
  onSubmit() {
    this.user = {
      id: this.user.id,
      ...this.userForm.value,
      direccion: {
        ...this.directionForm.value,
      },
    };

    this.apollo
      .mutate({
        mutation: CREATE_USER,
        variables: {
          ...this.user,
        },
        update: (cache, { data }) => {
          if (data) {
            const existingArray: any = cache.readQuery({
              query: GET_USERS,
            });

            if (existingArray) {
              cache.writeQuery({
                query: GET_USERS,

                data: {
                  getUsers: [...existingArray.getUsers, this.user],
                },
              });
            }
          }
        },
      })
      .subscribe({
        next: (resp: any) => {
          this.store.dispatch(addUserAction({ user: resp.data.updateUSer }));
          this._snackBar.open('Se Añadio correctamente correctamente', '', {
            duration: 1500,
          });
        },
        complete: () => this.router.navigate(['/users']),
      });
  }
}
