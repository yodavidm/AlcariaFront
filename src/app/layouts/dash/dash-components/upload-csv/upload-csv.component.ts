import { Component } from '@angular/core';
import { UploadCsvService } from '../../../../services/main-services/upload-csv.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-csv',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './upload-csv.component.html',
  styleUrl: './upload-csv.component.css'
})
export class UploadCsvComponent {

  constructor(private uploadCsvService: UploadCsvService, private toastr: ToastrService) { }

  selectedFile: File | null = null;
  result: any;


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onUpload() {
    if (!this.selectedFile) { return; }

    this.uploadCsvService.uploadUsers(this.selectedFile)
      .subscribe({
        next: (res) => {
          this.result = res;
          this.toastr.success('Usuarios importados correctamente')
          this.selectedFile = null;
        },
        error: (err) => {
          console.error('Error al subir el archivo', err),
          this.toastr.error('Error al subir el archivo')
        }
      });
  }

}
