import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonList, IonTitle, IonToolbar, IonButton, IonItem, IonLabel } from '@ionic/angular/standalone';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';
import { interval, Observable, Subscription, fromEvent } from 'rxjs';
import { DispositivoService } from '../services/dispositivo.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-listado-dispositivos',
  templateUrl: './listado-dispositivos.page.html',
  styleUrls: ['./listado-dispositivos.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonList, IonToolbar, CommonModule, FormsModule, IonButton, IonItem, IonLabel, 
          IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, RouterLink ], 
})
export class ListadoDispositivosPage implements OnInit, OnDestroy {

  dispositivo: any = null; 

  constructor(
    public dispositivoService: DispositivoService,
    private _actRouter: ActivatedRoute
  ) {}

  async ngOnInit() {

    const id = this._actRouter.snapshot.paramMap.get('id');
    console.log("Id del dispositivo", id);

    await this.dispositivoService.getDispositivos()
      .then((res: any[]) => {
        // Find the one with the same id
        this.dispositivo = res.find(d => d.dispositivoId == id);
        console.log("Dispositivo seleccionado:", this.dispositivo);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  ngOnDestroy() {}
}