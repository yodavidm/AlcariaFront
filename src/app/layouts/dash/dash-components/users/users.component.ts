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

  constructor(private service: UserService) { }

  users: UserResponse[] = [];

  isEmpty: boolean = true;

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.service.getUsers().subscribe({
      next: (data: UserResponse[]) => {
        this.users = data;
        this.isEmpty = !this.users || this.users.length === 0;


      },
      error: er => {
        console.log("no se pudieron cargar", er);
        this.isEmpty = true;

      }
    })
  }
}
