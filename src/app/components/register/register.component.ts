import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication-service/authentication.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';


class CustomValidators {
  static passwordContainsNumber(control: AbstractControl): ValidationErrors | null {
    const regex= /\d/;

    if(regex.test(control.value) && control.value !== null) {
      return null;
    } else {
      return {passwordInvalid: true};
    }
  }
  static passwordsMatch(control: AbstractControl): ValidationErrors | null {
    const passwordControl = control.get('password');
    const confirmPasswordControl = control.get('confirmPassword');
  
    if (!passwordControl || !confirmPasswordControl) {
      return null; // or handle the case when controls are null
    }
  
    const password = passwordControl.value;
    const confirmPassword = confirmPasswordControl.value;
  
    if (password === confirmPassword && password !== null && confirmPassword !== null) {
      return null;
    } else {
      return { passwordsNotMatching: true };
    }
  }
  
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm !: FormGroup;
  constructor(
    private authService: AuthenticationService,
    private formBuilder : FormBuilder,
    private router :Router,
  ){}
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      username: [null, [Validators.required]],
      email: [null, [
        Validators.required,
        Validators.email,
        Validators.minLength(6)
      ]],
      password: [null, [
        Validators.required,
        Validators.minLength(3),
        CustomValidators.passwordContainsNumber
      ]],
      confirmPassword: [null, [Validators.required]]
    },{
       validators: CustomValidators.passwordsMatch
    })
  
  }
  onSubmit(){
    if(this.registerForm.invalid) {
      return;
    }
    console.log(this.registerForm.value);
    this.authService.register(this.registerForm.value).pipe(
      map(user => this.router.navigate(['login']))
    ).subscribe()
  }

}
