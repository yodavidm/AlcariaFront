import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterModule,CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isLoggedIn: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.checkLogin();
  }

  // Revisar si hay token en localStorage
  checkLogin() {
    const token = localStorage.getItem('access_token');
    this.isLoggedIn = !!token;  // true si hay token, false si no
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.isLoggedIn = false;
    alert("ADIOS AMIGO")
    this.router.navigate(['home']);
  }

}
