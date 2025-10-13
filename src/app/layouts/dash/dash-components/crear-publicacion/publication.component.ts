import { Component, ElementRef, ViewChild } from '@angular/core';
import { PublicationService } from '../../../../services/dash-services/publication.service';
import { PubliRequest } from '../../../../interfaces/dash-faces/publi-request';
import { PubliResponse } from '../../../../interfaces/dash-faces/publi-response';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponse } from '../../../../interfaces/main-faces/error-response';

import Swal from 'sweetalert2';

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
  coverImagePreview: string = '';
  selectedCoverName: string = '';
  selectedImagesName: string[] = [];

  bodyImages: File[] = [];
  previewImagesToAdd: string[] = [];

  onCoverSelected(event: any) {
    this.coverImage = event.target.files[0];
    if (this.coverImage) {
      this.selectedCoverName = this.coverImage.name;

      const input = event.target as HTMLInputElement;
      const newFiles = Array.from(input.files || []);
      // Creamos una URL temporal para previsualizarlas
      newFiles.forEach(file => {
        const previewUrl = URL.createObjectURL(file);
        this.coverImagePreview = previewUrl;
      });

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

    // Creamos una URL temporal para previsualizarlas
    newFiles.forEach(file => {
      const previewUrl = URL.createObjectURL(file);
      this.previewImagesToAdd.push(previewUrl);
    });


    input.value = ''; // limpiar input
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
        this.toastr.success('Noticia creada con éxito.');
        this.request.title = '';
        this.request.content = '';
        this.editor.nativeElement.innerHTML = ''; // Limpiamos el editor también
        setTimeout(() => window.location.reload(), 2000);

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

  confirmImageDelete(image: string | File, isFile: boolean = false) {
    Swal.fire({
      title: '¿Quieres eliminar esta imagen?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        if (isFile) {
          // 🔹 Buscar el índice del previewUrl (image en este caso es la URL)
          const index = this.previewImagesToAdd.indexOf(image as string);

          if (index > -1) {
            // 🧠 Liberar memoria del blob URL
            URL.revokeObjectURL(this.previewImagesToAdd[index]);

            // ❌ Eliminar de ambas listas
            this.previewImagesToAdd.splice(index, 1);
            this.bodyImages.splice(index, 1);
          }
        }
      }

      Swal.fire({
        title: 'Eliminada',
        text: 'La imagen ha sido eliminada.',
        icon: 'success',
        timer: 1200,
        showConfirmButton: false,
        width: '250px'
      });
    }
    );
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

  //evitar copiar y pegar imágenes
  onPaste(event: ClipboardEvent) {
    // Evitar pegar imágenes (archivos o data:image)
    const items = event.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.kind === 'file' || item.type.startsWith('image/')) {
          event.preventDefault();
          return;
        }
      }
    }
  }

  onDrop(event: DragEvent) {
    // Evitar soltar imágenes
    if (event.dataTransfer?.files.length) {
      for (const file of Array.from(event.dataTransfer.files)) {
        if (file.type.startsWith('image/')) {
          event.preventDefault();
          return;
        }
      }
    }
  }

  onDragOver(event: DragEvent) {
    // Impide que el navegador intente insertar la imagen
    event.preventDefault();
  }

}
