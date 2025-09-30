import { Component } from '@angular/core';
import { LoginService } from '../../../../services/main-services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginRequest } from '../../../../interfaces/main-faces/login-request';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ErrorResponse } from '../../../../interfaces/main-faces/error-response';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-activate',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login-activate.component.html',
  styleUrl: './login-activate.component.css'
})
export class LoginActivateComponent {

  constructor(private loginService: LoginService, private router: Router, private route: ActivatedRoute, private toastr: ToastrService) { }

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

    this.loginService.doLoginActivate(this.login).subscribe({
      next: (data) => {
        this.toastr.success("Cuenta activada correctamente");
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        localStorage.setItem('login_success', 'true'); //mantener toast para home        
        window.location.href = '/home';

      },
      error: (err) => {
        const apiErr = err.error as ErrorResponse;

        // 👇 Aquí llegan las excepciones que lanza el backend
        if (apiErr.status === 400) {
          this.toastr.error(apiErr.message);
        }
        else {
          console.error(apiErr);
          this.toastr.error('Error inesperado en el servidor');
        }
      }
    })
  }
}
