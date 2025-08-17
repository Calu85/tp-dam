import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonList, IonTitle, IonToolbar, IonButton, IonItem, IonLabel } from '@ionic/angular/standalone';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';
import { interval, Observable, Subscription, fromEvent } from 'rxjs';
import { DispositivoService } from '../services/dispositivo.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-mediciones',
  templateUrl: './mediciones.page.html',
  styleUrls: ['./mediciones.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonList, IonToolbar, CommonModule, FormsModule, IonButton, IonItem, IonLabel, 
          IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, RouterLink ], 
})
export class MedicionesPage implements OnInit, OnDestroy {

  dispositivo: any = null;  // 👈 just one

  constructor(
    public dispositivoService: DispositivoService,
    private _actRouter: ActivatedRoute
  ) {}

  async ngOnInit() {
    // Get the id from route params
    const id = this._actRouter.snapshot.paramMap.get('id');
    console.log("Device ID from route:", id);

    // Fetch all dispositivos (you could also make a service method to get one by ID)
    await this.dispositivoService.getDispositivos()
      .then((res: any[]) => {
        // Find the one with the same id
        this.dispositivo = res.find(d => d.dispositivoId == id);
        console.log("Selected dispositivo:", this.dispositivo);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  ngOnDestroy() {}
}