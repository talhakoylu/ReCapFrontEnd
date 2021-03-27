import { Component, OnInit } from '@angular/core';
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
  name: string = "";
  roles: any[] = [];
  token: any;
  welcomeMessage: string;
  isLoggedIn: boolean;
  constructor(
    private jwtHelper: JwtHelperService,
    private localStorageService: LocalStorageService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn == true) {
      this.userDetailFromToken();
      this.welcomeMessage = GlobalConstants.Messages.welcomeMessage;
    }

    console.log(this.isLoggedIn);

  }

  userDetailFromToken() {
    this.token = this.localStorageService.get("token");
    let decodedToken = this.jwtHelper.decodeToken(this.token);
    let name = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    this.name = name.split(' ')[0];
    this.roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  }

  roleCheck(roleList: string[]) {
    if (this.roles !== undefined) {
      roleList.forEach(role => {
        if (this.roles.includes(role)) {
          return true;
        } else {
          return false;
        }
      })
      return true;
    } else {
      return false;
    }
  }

  logOut() {
    this.authService.logout();
    this.ngOnInit();
  }
}
