import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor() { }

  verToken() {
    var token = localStorage.getItem('access_token');
    if (token === null) {
      alert("sida amigo")
    } else {
      alert(token);
    }
  }

}
