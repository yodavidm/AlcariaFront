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

  constructor(private service:PublicationService){}

  publicaciones:PubliResponse[] = [];

   ngOnInit(): void {
    this.getPublications();
  }
  
  getPublications(){
    this.service.getPublications().subscribe({
      next: (data:PubliResponse[])=>{
        this.publicaciones = data;
      },
      error: er =>{
        console.log('No pudieron cargarse');
        
      }
    })
  }

}
