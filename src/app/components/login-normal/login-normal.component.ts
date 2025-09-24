import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { LoginRequest } from '../../interfaces/login-request';
import { FormsModule } from '@angular/forms';
import { ErrorResponse } from '../../interfaces/error-response';

@Component({
  selector: 'app-login-normal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-normal.component.html',
  styleUrl: './login-normal.component.css'
})
export class LoginNormalComponent {

  constructor(private loginService: LoginService, private router: Router, private route: ActivatedRoute) { }


  login: LoginRequest = {
    email: '',
    password: ''
  };
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.login.email = params['email'] || '';
    });
  }

  onSubmit() {

    this.loginService.doLogin(this.login).subscribe({
      next: (data) => {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        alert("Cuenta iniciada correctamente" + localStorage.getItem('access_token'));
        window.location.href = '/home';
      },
      error: (er) => {
        console.log("error activando cuenta", er);

      }
    })
  }


  onSubmitExcepciones() {

    this.loginService.doLogin(this.login).subscribe({
      next: (data) => {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        alert("Cuenta iniciada correctamente" + localStorage.getItem('access_token'));
        window.location.href = '/home';
      },
      error: (err) => {
        const apiErr = err.error as ErrorResponse;

        // 👇 Aquí llegan las excepciones que lanza el backend
        if (apiErr.status === 401) {
          alert(apiErr.message);
        }
        else {
          console.error(apiErr);
          alert('Error inesperado en el servidor');
        }
      }
    })
  }




}
