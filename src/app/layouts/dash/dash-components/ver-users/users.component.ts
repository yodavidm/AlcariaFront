import { Component } from '@angular/core';
import { UserService } from '../../../../services/dash-services/user.service';
import { UserResponse } from '../../../../interfaces/dash-faces/user-response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

   users: UserResponse[] = [];
  isEmpty = false;
  loading = true;

  constructor(private service: UserService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.loading = true;
    this.service.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.isEmpty = !this.users || this.users.length === 0;
        this.loading = false;
      },
      error: (err) => {
        console.error("no se pudieron cargar", err);
        this.isEmpty = true;
        this.loading = false;
      }
    });
  }
}
