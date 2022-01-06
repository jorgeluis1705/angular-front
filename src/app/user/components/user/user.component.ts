import { getUserActions } from './../../../store/actions/user.actions';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IUser } from '../../shared/models/user.model';
import { Observable } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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
    private formbuilder: FormBuilder
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
      calle: [this.user.direccion.calle],
      ciudad: [this.user.direccion.ciudad],
      numero: [this.user.direccion.numero],
      estado: [this.user.direccion.estado],
    });
  }
}
