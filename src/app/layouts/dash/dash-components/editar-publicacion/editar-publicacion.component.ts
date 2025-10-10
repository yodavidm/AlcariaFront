import { Component, ElementRef, ViewChild } from '@angular/core';
import { PubliRequest } from '../../../../interfaces/dash-faces/publi-request';
import { ToastrService } from 'ngx-toastr';
import { PublicationService } from '../../../../services/dash-services/publication.service';
import { PubliResponse } from '../../../../interfaces/dash-faces/publi-response';
import { ErrorResponse } from '../../../../interfaces/main-faces/error-response';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-publicacion',
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-publicacion.component.html',
  styleUrl: './editar-publicacion.component.css'
})
export class EditarPublicacionComponent {

  constructor(private publiService: PublicationService, private toastr: ToastrService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getPublicationById();
  }

  // ---------- PUBLICACIÓN ----------
  request: PubliRequest = {
    title: '',
    content: ''
  };

  response:PubliResponse ={
    id: '',
    createdAt: '',
    title: '',
    content: '',
    coverImageUrl: '',
    bodyImagesUrl: []
  }


  publicaciones: PubliResponse[] = [];

  coverImage!: File;
  selectedCoverName: string = '';
  selectedImagesName: string[] = [];

  bodyImages: File[] = [];

  newBodyImagesUrls:string[] = [];

  getPublicationById() {
    const id = this.route.snapshot.paramMap.get('id'); // ✅ forma correcta

    if (id) {
      this.publiService.getPublicationById(id).subscribe({
        next: data => {
          this.response = data;
          if (this.editor && this.editor.nativeElement) {
            this.editor.nativeElement.innerHTML = this.response.content || '';
          }
        },
        error: err => {
          alert("Error recuperando publicación");
          console.error(err);
        }
      });
    }
  }

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

  // Añadimos los nuevos Files a la lista
  this.bodyImages.push(...newFiles);

  // Creamos una URL temporal para previsualizarlas
  newFiles.forEach(file => {
    const previewUrl = URL.createObjectURL(file);
    this.newBodyImagesUrls.push(previewUrl);
  });

  input.value = ''; // limpiar input
}


  editPublication() {
    const formData = new FormData();
    formData.append('request', new Blob([JSON.stringify(this.request)], { type: 'application/json' }));

    if (this.coverImage) formData.append('coverImage', this.coverImage);
    if (this.bodyImages && this.bodyImages.length > 0) {
      for (let img of this.bodyImages) formData.append('bodyImages', img);
    }

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.publiService.editPublication(formData, id).subscribe({
        next: data => {
          this.request = data;
          this.toastr.success('Noticia actualizada correctamente')
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
      })
    }
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
