import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { LoginRequest } from '../../interfaces/login-request';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-activate',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-activate.component.html',
  styleUrl: './login-activate.component.css'
})
export class LoginActivateComponent {

  constructor(private loginService: LoginService, private router: Router) { }

    login: LoginRequest = {
      email: '',
      password: ''
    };
    
  onSubmit() {
    this.loginService.doLoginActivate(this.login).subscribe({
      next: (data) => {
        console.log("Cuenta activada correctamente");
        localStorage.setItem('access_token', data.accessToken);
        localStorage.setItem('refresh_token', data.refreshToken);
        this.router.navigate(['/home']);

      },
      error: (er) => {
        console.log("error activando cuenta", er);

      }
    })
  }
}
