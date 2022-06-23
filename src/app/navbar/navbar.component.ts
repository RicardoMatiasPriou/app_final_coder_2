import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userLogged=this.AuthService.getUserLoged()
  constructor(private AuthService:AuthService, private routes:Router) { }

  ngOnInit(): void {
  }

  register = localStorage.getItem('reg') == 'true' ? false : true;
 logOut(){
   this.AuthService.logOut()
   setTimeout(() => {

     this.routes.navigate(['/'])
  }, 2000);

  }
}
