import { Component,Output,EventEmitter } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer,SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  styleUrl: './cropper.component.scss'
})
export class CropperComponent {
  name = 'Angular';

  imageChangedEvent: Event | null = null;
  croppedImage: string  = '';
  constructor(public dialogRef: MatDialogRef<CropperComponent>,private sanitizer: DomSanitizer) {}

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }


  imageCropped(event: ImageCroppedEvent) {
    if (!event.objectUrl) {
      console.error("L'URL de l'image rognée est indéfinie.");
      return;
    }
    fetch(event.objectUrl)
        .then(response => {return response.blob();})
        .then(blob => {
          const reader = new FileReader();
          reader.onloadend = () => {
            this.croppedImage = reader.result as string; // Convertit en base64
          };
          reader.readAsDataURL(blob);
        })
  }

  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  closePopup(): void {
    this.dialogRef.close();
  }
  sendImage():void{
    this.dialogRef.close(this.croppedImage);
  }
}
