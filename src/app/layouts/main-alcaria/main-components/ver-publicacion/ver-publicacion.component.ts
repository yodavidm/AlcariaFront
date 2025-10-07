import { Component } from '@angular/core';
import { PublicationService } from '../../../../services/dash-services/publication.service';
import { PubliResponse } from '../../../../interfaces/dash-faces/publi-response';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ver-publicacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-publicacion.component.html',
  styleUrl: './ver-publicacion.component.css'
})
export class VerPublicacionComponent {

  constructor(private service: PublicationService, private route: ActivatedRoute) { }

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
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.service.getPublicationById(id).subscribe({
          next: data => this.publication = data,
          error: err => console.error('Error al cargar publicación', err)
        });
      }
    });
  }

}
