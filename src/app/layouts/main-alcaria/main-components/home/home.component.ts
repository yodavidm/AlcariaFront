import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PublicationService } from '../../../../services/dash-services/publication.service';
import { PubliResponse } from '../../../../interfaces/dash-faces/publi-response';
import { Router, RouterModule } from '@angular/router';


@Component({
    selector: 'app-home',
    imports: [RouterModule, CommonModule],
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private toastr: ToastrService, private service: PublicationService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('login_success') === 'true') {
      this.toastr.success('Cuenta iniciada correctamente');
      localStorage.removeItem('login_success');
    }
    this.getPublications();

  }


  verToken() {
    var token = localStorage.getItem('access_token');
    if (token === null) {
      this.toastr.error("no hay token")
    } else {
      alert(token);
    }
  }

  publicaciones: PubliResponse[] = [];


  getPublications() {
    this.service.getPublications().subscribe({
      next: (data: PubliResponse[]) => {
        // Ordenar de más nuevo a más viejo
        this.publicaciones = data.sort((a, b) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
      },
      error: er => {
        console.log('No pudieron cargarse');
      }
    });
  }

  goToPublication(id: string) {
    if (!id) return;
    this.router.navigate(['/publicacion', id]).then(() => {
      window.scrollTo(0, 0);
    });
  }




}
