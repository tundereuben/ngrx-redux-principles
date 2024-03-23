import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getMaskUsername } from '../state/userReducer';
import * as UserActions from '../../user/state/user.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // maskUsername: boolean = false;
  maskUsername$!: Observable<boolean>;

  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.maskUsername$ = this.store.select(getMaskUsername);
  }

  showMaskUsername(): void {
    this.store.dispatch(UserActions.maskUsername());
  }

}
