import { Component } from '@angular/core';
import { PublicationService } from '../../../../services/dash-services/publication.service';

@Component({
  selector: 'app-ver-publicacion',
  standalone: true,
  imports: [],
  templateUrl: './ver-publicacion.component.html',
  styleUrl: './ver-publicacion.component.css'
})
export class VerPublicacionComponent {

  private constructor(private service:PublicationService){}

  ngOnInit(){}


}
