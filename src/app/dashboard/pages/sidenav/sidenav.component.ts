import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  userLogged = this.AuthService.getUserLoged();
  register = localStorage.getItem('reg') == 'true' ? false : true;
  admin = localStorage.getItem('admin') == 'true' ? true : false;


  constructor(private AuthService: AuthService, private routes: Router) {}

  ngOnInit(): void {}
  logOut() {
    this.AuthService.logOut();
    setTimeout(() => {
      this.routes.navigate(['/']);
    }, 1000);
  }
}
