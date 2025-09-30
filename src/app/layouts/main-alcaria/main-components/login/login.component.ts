import { Component } from '@angular/core';
import { LoginService } from '../../../../services/main-services/login.service';
import { Router } from '@angular/router';
import { LoginRequest } from '../../../../interfaces/main-faces/login-request';
import { FormsModule } from '@angular/forms';
import { UserCheckResponse } from '../../../../interfaces/main-faces/user-check-response';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponse } from '../../../../interfaces/main-faces/error-response';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private loginService: LoginService, private router: Router, private toastr: ToastrService) { }

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
  pajo() {
    alert("ERES UN PAJO")
  }


  onAccountCheckActiveOrExist() {
    this.loginService.isAccountActive(this.emailCheck).subscribe({
      next: user => {
        // Si la cuenta existe y está activa
        this.router.navigate(['login-normal'], { queryParams: { email: this.emailCheck } });
      },
      error: (err: HttpErrorResponse) => {

        const apiErr = err.error as ErrorResponse;

        // 👇 Aquí llegan las excepciones que lanza el backend
        if (apiErr.status === 404) {
          this.toastr.error(apiErr.message);
        } else if (apiErr.status === 409) {
          this.toastr.info(apiErr.message);
          this.router.navigate(['activar-cuenta'], { queryParams: { email: this.emailCheck } });
        } else {
          console.error(apiErr);
          this.toastr.error('Error inesperado en el servidor');
        }
      }
    });
  }




}
