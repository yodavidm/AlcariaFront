import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { LoginRequest } from '../../interfaces/login-request';
import { FormsModule } from '@angular/forms';
import { UserCheckResponse } from '../../interfaces/user-check-response';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponse } from '../../interfaces/error-response';

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

  emailCheck: string = '';

  user: UserCheckResponse = {
    id: '',
    completeName: '',
    department: '',
    email: '',
    ideaUser: '',
    coordinator: false,
    isAccountActive: false
  }

  onAccountCheck() {
    this.loginService.isAccountActive(this.emailCheck).subscribe({
      next: isActive => {
        if (isActive) {
          alert("Puede logear con normalidad")
          this.router.navigate(['login-normal'], { queryParams: { email: this.emailCheck } });
        } else {
          alert("Vaya! Parece que tu cuenta aún no está activada")
          this.router.navigate(['activar-cuenta'], { queryParams: { email: this.emailCheck } });
        }
      },
      error: err => {
        alert("Usuario " + this.emailCheck + " no encontrado")
        console.error(err);
      }
    });
  }

  pajo() {
    alert("ERES UN PAJO")
  }

  
  // tu-componente.ts
onAccountCheckActiveOrExist() {
  this.loginService.isAccountActive(this.emailCheck).subscribe({
    next: user => {
      // ✅ Solo se ejecuta si la respuesta es 2xx (cuenta activa en tu caso)
      this.router.navigate(['login-normal'], { queryParams: { email: this.emailCheck } });
    },
    error: (err: HttpErrorResponse) => {

      const apiErr = err.error as ErrorResponse;

      // 👇 Aquí llegan las excepciones que lanza el backend
      if (apiErr.status === 404) {
        alert(apiErr.message);
      } else if (apiErr.status === 409) {
        alert(apiErr.message);
        this.router.navigate(['activar-cuenta'], { queryParams: { email: this.emailCheck } });
      } else {
        console.error(apiErr);
        alert('Error inesperado en el servidor');
      }
    }
  });
}




}
