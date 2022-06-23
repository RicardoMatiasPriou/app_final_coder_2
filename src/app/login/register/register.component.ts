import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  usuario = {
    email: '',
    password: '',
  };

  constructor(
    private AuthService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.route.queryParams.subscribe((params) => {
    //   this.name = params['name'];
    // });
  }
  Registrarse() {
    const { email, password } = this.usuario;

    this.AuthService.register(email, password).then((res) => {
      this.AuthService.login(email, password).then((r) => {
        this.router.navigate(['/dashboard']);
      });
    });
  }


}
