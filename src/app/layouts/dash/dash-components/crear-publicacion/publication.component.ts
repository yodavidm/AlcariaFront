import { Component, ElementRef, ViewChild } from '@angular/core';
import { PublicationService } from '../../../../services/dash-services/publication.service';
import { PubliRequest } from '../../../../interfaces/dash-faces/publi-request';
import { PubliResponse } from '../../../../interfaces/dash-faces/publi-response';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponse } from '../../../../interfaces/main-faces/error-response';

@Component({
  selector: 'app-publication',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './publication.component.html',
  styleUrl: './publication.component.css'
})
export class PublicationComponent {

  constructor(private publiService: PublicationService, private toastr: ToastrService) { }

  // ---------- PUBLICACIÓN ----------
  request: PubliRequest = {
    title: '',
    content: ''
  };

  publicaciones: PubliResponse[] = [];

  coverImage!: File;
  selectedCoverName: string = '';
  selectedImagesName: string[] = [];

  bodyImages: File[] = [];

  onCoverSelected(event: any) {
    this.coverImage = event.target.files[0];
    if (this.coverImage) {
      this.selectedCoverName = this.coverImage.name;
    } else {
      this.selectedCoverName = '';
    }
  }

  onBodyImagesSelected(event: any) {
    const input = event.target as HTMLInputElement;
    const newFiles = Array.from(input.files || []);

    if (!this.bodyImages) {
      this.bodyImages = [];
    }

    this.bodyImages = this.bodyImages.concat(newFiles);

    // Limpiar el input para que se puedan volver a seleccionar los mismos archivos
    input.value = '';
  }

  addPublication() {
    const formData = new FormData();
    formData.append('request', new Blob([JSON.stringify(this.request)], { type: 'application/json' }));

    if (this.coverImage) formData.append('coverImage', this.coverImage);
    if (this.bodyImages && this.bodyImages.length > 0) {
      for (let img of this.bodyImages) formData.append('bodyImages', img);
    }

    this.publiService.addPublication(formData).subscribe({
      next: data => {
        alert(`Publicación creada: ${data.title}`);
        this.request.title = '';
        this.request.content = '';
        this.editor.nativeElement.innerHTML = ''; // Limpiamos el editor también
      },
      error: err => {
        const apiErr = err.error as ErrorResponse;
        if (apiErr.status === 400) {
          this.toastr.warning(apiErr.message);
        } else {
          console.error(apiErr);
          this.toastr.error('Error inesperado en el servidor');
        }
      }
    });
  }


  // ---------- EDITOR DE TEXTO ----------
  @ViewChild('editor') editor!: ElementRef<HTMLDivElement>;

  isBoldActive = false;
  isUnderlineActive = false;
  isLinkActive = false;

  ngAfterViewInit() {
    this.editor.nativeElement.innerHTML = this.request.content;
  }

  onInput() {
    this.request.content = this.editor.nativeElement.innerHTML;
  }

  toggleBold() {
    document.execCommand('bold'); //cambiar a negrita
    this.editor.nativeElement.focus();
    this.updateTextStates();
    this.onInput();
  }

  toggleUnderline() {
    document.execCommand('underline');
    this.editor.nativeElement.focus();
    this.updateTextStates();
    this.onInput();
  }

  updateTextStates() {
    this.isBoldActive = document.queryCommandState('bold');
    this.isUnderlineActive = document.queryCommandState('underline');
  }

  addLink() {
    const url = prompt('Introduce la URL del enlace:');
    if (url) {
      document.execCommand('createLink', false, url);
      this.editor.nativeElement.focus();
      this.onInput();
    }
  }

}
