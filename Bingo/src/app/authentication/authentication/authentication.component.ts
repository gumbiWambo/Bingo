import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'b-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  constructor(private userService: AuthenticationService, private router: Router) { }
  public register = false;
  ngOnInit(): void {
  }
  public submitRegister(form: NgForm) {
    if(form.valid) {
      this.userService.registerUser(form.value.username, form.value.password, form.value.email).then(() => {
        this.register = false;
      });
    }
  }
  public submitLogin(form: NgForm) {
    if(form.valid) {
      this.userService.loginUser(form.value.username, form.value.password).then((user: any) => {
        sessionStorage.setItem('player', user.username);
        this.router.navigate(['session']);
      });
    }
  }
}
