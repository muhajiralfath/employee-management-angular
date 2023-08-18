import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = ""
  password: string = ""

  adminAccount: { username: string, password: string } = {
    username: "admin",
    password: "admin"
  }

  account: { username: string, password: string, isLogin: boolean }= {
    username: "",
    password: "",
    isLogin: false
  }

  constructor(private readonly router: Router) {
  }

  moveToHome(): void{
    this.router.navigateByUrl("/employee/list")
  }

  login() {
    if (this.account.username === this.adminAccount.username && this.account.password === this.adminAccount.password){
      this.moveToHome()
      this.account.isLogin = true
    } else {
      alert("Plase input correct correct username & password")
    }
  }
}
