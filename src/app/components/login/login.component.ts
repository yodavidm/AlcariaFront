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

  emailCheck: string = '';

  onAccountCheck() {
    this.loginService.isAccountActive(this.emailCheck).subscribe({
      next: isActive => {
        if (isActive) {
          alert("Puede logear con normalidad")
          this.router.navigate(['login-normal'],{ queryParams: { email: this.emailCheck } });
        } else {
          alert("Vaya! Parece que tu cuenta aún no está activada")
          this.router.navigate(['activar-cuenta'],{ queryParams: { email: this.emailCheck } });
        }
      },
      error: err => {
        alert("Usuario " + this.emailCheck + " no encontrado")
        console.error(err);
      }
    });
  }


}
