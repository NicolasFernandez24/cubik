import { Component } from '@angular/core';
import { Router } from '@angular/router';
declare var google: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  map: any;
  constructor(private router: Router) {}
  ngOnInit(): void {
    window.addEventListener('load', () => {
      this.initMap();
    });
  }
  playGuitarSoundAndNavigate() {
    this.playGuitarSound();
   
    setTimeout(() => {
      this.router.navigate(['/salas']);
    }, 1000); 
  }

playGuitarSound() {
  console.log('Intentando reproducir el sonido');
  const guitarSound = new Audio('./assets/sound/zapsplat_musical_guitar_nylon_out_of_tune_single_strum_004_61222.mp3') as HTMLAudioElement;
  guitarSound.play();
}
initMap(): void {
  this.map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -32.8768298, lng: -68.8277476},
    zoom: 16
  });

  const marker = new google.maps.Marker({
    position: { lat: -32.8768298, lng:-68.8277476 },
    map: this.map,
    title: 'Kubi-k Salas De Ensayo'
  });
}
}


