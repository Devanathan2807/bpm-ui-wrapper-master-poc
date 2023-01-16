import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  firstName: string = "";
  lastName: string = "";
  userName: string = "";
  password: string = "";

  constructor(private router: Router){

  }

  submit() {
    console.log("")
    this.clear();
    this.router.navigateByUrl('/')
  }

  clear() {
    this.firstName = "";
    this.lastName = "";
    this.userName = "";
    this.password = "";
  }
}
