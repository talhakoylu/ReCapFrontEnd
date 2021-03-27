import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {
  token:any = "";
  constructor(
    private localStorageService: LocalStorageService,
    private jwtHelper: JwtHelperService
  ) { }

  ngOnInit(): void {
  }

  getToken(){
    this.token = this.localStorageService.get('token');
    console.log(this.token);
    let decodedToken = this.jwtHelper.decodeToken(this.token);
    console.log(decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
  }

}
