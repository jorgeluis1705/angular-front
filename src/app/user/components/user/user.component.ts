import { GET_USER } from './../../../client/user/queries';
import { UPDATE_USER } from './../../../client/user/mutations';
import { getUserActions } from './../../../store/actions/user.actions';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IUser } from '../../shared/models/user.model';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { GET_USERS } from 'src/app/client/user/queries';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
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
    private activate: ActivatedRoute,
    private store: Store<{ users: any }>,
    protected router: Router,
    private formbuilder: FormBuilder,
    private apollo: Apollo
  ) {
    this.store.dispatch(
      getUserActions({
        user: (this.activate.snapshot.data as any).user as IUser,
      })
    );
    this.userStore = store.select('users');
    this.userStore.subscribe((e) => (this.user = e.userSelected));
  }

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
        mutation: UPDATE_USER,
        variables: {
          ...this.user,
        },
        update: (cache, { data }) => {
          if (data) {
            const existingArray: any = cache.readQuery({
              query: GET_USERS,
            });
            const existingItem: any = cache.readQuery({
              query: GET_USER,
              variables: {
                id: this.user.id,
              },
            });
            if (existingArray) {
              cache.writeQuery({
                query: GET_USERS,

                data: {
                  getUsers: (existingArray.getUsers as IUser[]).map((e) =>
                    e.id === this.user.id ? (e = this.user) : e
                  ),
                },
              });
            }
            if (existingItem) {
              cache.writeQuery({
                query: GET_USER,
                variables: {
                  id: this.user.id,
                },

                data: {
                  getUser: this.user,
                },
              });
            }
          }
        },
      })
      .subscribe({
        next: (resp: any) =>
          this.store.dispatch(getUserActions({ user: resp.data.updateUSer })),
        complete: () => this.router.navigate(['/users']),
      });
  }
}
