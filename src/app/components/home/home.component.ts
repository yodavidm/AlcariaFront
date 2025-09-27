import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface News {
  title: string;
  description: string;
  image: string;
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor() { }

  verToken() {
    var token = localStorage.getItem('access_token');
    if (token === null) {
      alert("No hay token")
    } else {
      alert(token);
    }
  }
  

}
