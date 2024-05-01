import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackgroundImageService {
  backgrounds: { [id: number]: string } = {
    1: './assets/Nirvana.jpg',
    2: './assets/Maradona.jpg',
    3: './assets/proda.jpg',
    4: './assets/BobMarley.jpg'

  };
  salaImages: { [id: number]: string[] } = {
    1: ['./assets/sala1_image1.jpg', './assets/sala1_image2.jpg', './assets/sala1_image3.jpg'],
    2: ['./assets/sala2_image1.jpg', './assets/sala2_image2.jpg', './assets/sala2_image3.jpg'],
    3: ['./assets/sala3_image1.jpg', './assets/sala3_image2.jpg', './assets/sala3_image3.jpg'],
    4: ['./assets/sala4_image1.jpg', './assets/sala4_image2.jpg', './assets/sala4_image3.jpg'],
  };

  constructor() {}

  getBackgroundImage(salaId: number): string {
    return this.backgrounds[salaId] || ''; 
  }

 
 

  getSalaImages(salaId: number): string[] {
    return this.salaImages[salaId] || []; 
  }
}

