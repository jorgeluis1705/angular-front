import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  constructor(private actovate: ActivatedRoute) {
    console.log(this.actovate.snapshot.data);
  }

  ngOnInit(): void {}
}
