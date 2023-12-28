import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication-service/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  loginForm! : FormGroup;

  constructor(private authService:AuthenticationService,
    private router:Router){}
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email : new FormControl(null,[Validators.required,Validators.email,Validators.minLength(6)]),
      password : new FormControl(null,[Validators.required,Validators.minLength(3)]),

    })
  }
   // login() {

    //  this.authService.login('snoussi112@gmail.com','simplePass11111').subscribe(data =>console.log("success"))
      
      //}
    
  onSubmit(){
    if(this.loginForm.invalid){
      return;
    }
    this.authService.login(this.loginForm.value).pipe(
      map(token=> this.router.navigate(['admin']))
    ).subscribe();
  }


}
