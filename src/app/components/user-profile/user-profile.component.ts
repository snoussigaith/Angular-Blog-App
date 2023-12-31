import { Component, OnInit } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { User } from '../../services/authentication-service/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user-service/user.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  userId: number|null = null;
  private sub! : Subscription;
  user : User|null = null;
constructor(private activatedRoute: ActivatedRoute,
  private userService: UserService,){}
  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params=>{
      this.userId = parseInt(params['id']);
      this.userService.findOne(this.userId).pipe(
        map((user:User) => this.user = user)
      ).subscribe();
    })
  }
  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
