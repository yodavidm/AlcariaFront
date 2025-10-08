import { Component } from '@angular/core';
import { PublicationService } from '../../../../services/dash-services/publication.service';
import { PubliResponse } from '../../../../interfaces/dash-faces/publi-response';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ver-publicacion',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './ver-publicacion.component.html',
  styleUrl: './ver-publicacion.component.css'
})
export class VerPublicacionComponent {

  constructor(private service: PublicationService, private route: ActivatedRoute) { }

  loading = true;

  publication: PubliResponse = {
    id: '',
    createdAt: '',
    title: '',
    content: '',
    coverImageUrl: '',
    bodyImagesUrl: []
  }

  ngOnInit() {
    this.getPublicationById();
  }


  getPublicationById() {
    this.loading = true;
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.service.getPublicationById(id).subscribe({
          next: data => {
            this.publication = data;
            this.loading = false;
          },
          error: err => {
            console.error('Error al cargar publicación', err);
            this.loading = false;
          }
        });
      }
    });
  }

}
