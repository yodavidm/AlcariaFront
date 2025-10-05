import { Component } from '@angular/core';
import { PublicationService } from '../../../../services/dash-services/publication.service';
import { PubliResponse } from '../../../../interfaces/dash-faces/publi-response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ver-publicaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-publicaciones.component.html',
  styleUrl: './ver-publicaciones.component.css'
})
export class VerPublicacionesComponent {

  constructor(private service: PublicationService) { }

  publicaciones: PubliResponse[] = [];

  isEmpty: boolean = true;

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
      },
      error: er => {
        console.log('No pudieron cargarse');
        this.isEmpty = true;
      }
    });
  }


}
