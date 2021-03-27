import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-app-header-account-area',
  templateUrl: './app-header-account-area.component.html',
  styleUrls: ['./app-header-account-area.component.css']
})
export class AppHeaderAccountAreaComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }
}
