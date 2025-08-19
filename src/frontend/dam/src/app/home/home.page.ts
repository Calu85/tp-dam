import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonList, IonTitle, IonToolbar, IonButton, IonItem, IonLabel } from '@ionic/angular/standalone';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';
import { fromEvent } from 'rxjs';
import { DispositivoService } from '../services/dispositivo.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonList, IonToolbar, CommonModule, IonButton, IonItem, IonLabel, 
          IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, RouterLink], 
})
export class HomePage {
  dispositivos: any = []

  mouseMove$ = fromEvent(document, 'mousemove')

  @Input()
  id = '';

  ionViewWillEnter () {
    console.log(this._actRouter.snapshot.paramMap.get('id'))
  }

  constructor(public dispositivoService: DispositivoService,
              private _actRouter: ActivatedRoute) {
  }

  async ngOnInit() {
    await this.dispositivoService.getDispositivos()
      .then((res) => {
        this.dispositivos = res
        console.log("dispositivos", this.dispositivos)
        console.log("La promesa resolvió")
      })
      .catch((error) => {
        console.log(error)
      })
    // Acá pongo código que debería ejecutarse con this.dispositivos conteniendo un arreglo de dispositivos
    console.log("Ejecución fuera de la promesa")
  }

  ngOnDestroy() {

  }
}
