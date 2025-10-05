import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { LoginService } from '../../../../services/main-services/login.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isLoggedIn: boolean = false;

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.checkLogin();
  }

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  // Revisar si hay token en localStorage
checkLogin() {
  const token = localStorage.getItem('access_token');

  if (!token) {
    
    this.isLoggedIn = false;
    console.log('No hay token en localStorage');
    
    return;
  }

  try {
    // decodifica el token
    const decoded: any = jwtDecode(token);

    // exp viene en segundos → Date.now() en milisegundos
    const isExpired = decoded.exp * 1000 < Date.now();

    console.log("Estado de expiración de token: " + isExpired);

    if (isExpired) {
      localStorage.removeItem('access_token'); // opcional: limpiar
      this.isLoggedIn = false;
    } else {
      this.isLoggedIn = true;
    }

  } catch (err) {
    // si el token está corrupto o no es válido
    localStorage.removeItem('access_token');
    this.isLoggedIn = false;
  }
}


  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.isLoggedIn = false;
    alert("ADIOS AMIGO")
    this.router.navigate(['home']);
  }

}
