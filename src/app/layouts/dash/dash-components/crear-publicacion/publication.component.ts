import { Component } from '@angular/core';
import { PublicationService } from '../../../../services/dash-services/publication.service';
import { PubliRequest } from '../../../../interfaces/dash-faces/publi-request';
import { PubliResponse } from '../../../../interfaces/dash-faces/publi-response';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-publication',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './publication.component.html',
  styleUrl: './publication.component.css'
})
export class PublicationComponent {

  constructor(private publiService: PublicationService) { }

  request: PubliRequest = {
    title: '',
    content: ''
  }

  publicaciones: PubliResponse[] = [];


  coverImage!: File;
  bodyImages: File[] = [];

  onCoverSelected(event: any) {
    this.coverImage = event.target.files[0];
  }

  onBodyImagesSelected(event: any) {
    this.bodyImages = Array.from(event.target.files);
  }

  addPublication() {
    const formData = new FormData();
    formData.append('request', new Blob([JSON.stringify(this.request)], { type: 'application/json' }));

    // Aquí añades los archivos (asegúrate de tenerlos seleccionados desde un input)
    if (this.coverImage) {
      formData.append('coverImage', this.coverImage);
    }

    if (this.bodyImages && this.bodyImages.length > 0) {
      for (let img of this.bodyImages) {
        formData.append('bodyImages', img);
      }
    }

    this.publiService.addPublication(formData).subscribe({
      next: data => {
        alert(`Publicación creada: ${data.title}`);
        this.request.title = '';
        this.request.content = '';
      },
      error: er => {
        alert("Error: " + er.message);
      }
    });
  }

}
