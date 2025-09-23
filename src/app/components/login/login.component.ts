import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { LoginRequest } from '../../interfaces/login-request';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private loginService: LoginService, private router: Router) { }

  login: LoginRequest = {
    email: '',
    password: ''
  };

  onSubmit() {
    this.loginService.doLogin(this.login).subscribe({
      next: (data) => {
        console.log("Login iniciado correctamente");
        localStorage.setItem('access_token', data.accessToken);
        localStorage.setItem('refresh_token', data.refreshToken);
        this.router.navigate(['/home']);

      },
      error: (er) => {
        console.log("error en login", er);

      }
    })
  }

  onLogin() {
    this.loginService.doLogin(this.login).subscribe({
      next: data => {
        console.log("Login iniciado correctamente");
        console.log("Login iniciado correctamente");
        localStorage.setItem('access_token', data.accessToken);
        localStorage.setItem('refresh_token', data.refreshToken);
        this.router.navigate(['home']);
      },

      error: err => {
        if (err.status === 403) { // o el status que hayas usado
          alert('Tu cuenta aún no está activada. Por favor actívala primero.');
          this.router.navigate(['activar-cuenta'])
          // aquí puedes redirigir a la página de activación
        } else {
          alert('Credenciales incorrectas o error de servidor');
        }
      }
    });
  }

}
