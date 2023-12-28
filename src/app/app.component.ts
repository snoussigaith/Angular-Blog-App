import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication-service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
  constructor(private router:Router,private authService:AuthenticationService){}

  navigateTo(value: any) {
    this.router.navigate(['../', value]);
  }
}
