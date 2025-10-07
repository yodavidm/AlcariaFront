import { Component } from '@angular/core';
import { PublicationService } from '../../../../services/dash-services/publication.service';
import { PubliResponse } from '../../../../interfaces/dash-faces/publi-response';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-ver-publicaciones',
    imports: [CommonModule, RouterModule],
    standalone: true,
    templateUrl: './ver-publicaciones.component.html',
    styleUrl: './ver-publicaciones.component.css'
})
export class VerPublicacionesComponent {

  constructor(private service: PublicationService, private router: Router, private route: ActivatedRoute) { }

  publicaciones: PubliResponse[] = [];
  publicacion: PubliResponse = {
    id: '',
    createdAt: '',
    title: '',
    content: '',
    coverImageUrl: '',
    bodyImagesUrl: []
  }

  isEmpty: boolean = true;
  loading: boolean = true;


  ngOnInit(): void {
    this.getPublications();
  }

  getPublications() {
    this.service.getPublications().subscribe({
      next: (data: PubliResponse[]) => {
        // Ordenar de más nuevo a más viejo
        this.publicaciones = data.sort((a, b) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        this.isEmpty = !this.publicaciones || this.publicaciones.length === 0;
        this.loading = false;

      },
      error: er => {
        console.log('No pudieron cargarse');
        this.isEmpty = true;
        this.loading = false;

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
