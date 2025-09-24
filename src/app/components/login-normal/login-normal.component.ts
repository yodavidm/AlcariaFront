import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { LoginRequest } from '../../interfaces/login-request';
import { FormsModule } from '@angular/forms';

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
    // Validar la contraseña manualmente
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordPattern.test(this.login.password)) {
      alert('La contraseña debe tener mínimo 6 caracteres, incluyendo mayúscula, minúscula y número');
      return;
    }
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


}
