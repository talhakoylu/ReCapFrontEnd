import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { GlobalConstants } from 'src/common/global-constants';

@Component({
  selector: 'app-nav-user',
  templateUrl: './nav-user.component.html',
  styleUrls: ['./nav-user.component.css']
})
export class NavUserComponent implements OnInit {
  welcomeMessage: string;
  constructor(
    public authService: AuthService,
    private router : Router,
    ) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.authService.userDetailFromToken();     
      this.welcomeMessage = GlobalConstants.Messages.welcomeMessage;
    }
  }

  logOut() {
    this.authService.logout();
  }
}