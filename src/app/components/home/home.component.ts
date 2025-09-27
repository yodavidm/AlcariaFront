import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private toastr: ToastrService) { }

  ngOnInit() {
    if (localStorage.getItem('login_success') === 'true') {
      this.toastr.success('Cuenta iniciada correctamente');
      localStorage.removeItem('login_success');
    }
  }


  verToken() {
    var token = localStorage.getItem('access_token');
    if (token === null) {
      this.toastr.error("no hay token")
    } else {
      alert(token);
    }
  }


}
