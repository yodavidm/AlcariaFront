import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PublicationService } from '../../../../services/dash-services/publication.service';
import { PubliRequest } from '../../../../interfaces/dash-faces/publi-request';
import { PubliResponse } from '../../../../interfaces/dash-faces/publi-response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-publication',
  standalone: true,
  imports: [FormsModule, CommonModule],
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

  addPublication() {
    this.publiService.addPublication(this.request).subscribe({
      next: data => {
        alert("Publicacion " + data.id + " y titulo " + data.title);
      },
      error: er => {
        alert("cagaste amigo!! " + er)
      }
    })
  }

}
