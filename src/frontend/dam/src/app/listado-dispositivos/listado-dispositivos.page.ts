import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonList, IonTitle, IonToolbar, IonButton, IonItem, IonLabel, IonToggle } from '@ionic/angular/standalone';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';
// import { interval, Observable, Subscription, fromEvent } from 'rxjs';
import { DispositivoService } from '../services/dispositivo.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TiempoAtrasPipe } from '../tiempo-atras.pipe'; 
import { ValveStatusDirective } from '../directives/cambiar-color.directives';

@Component({
  selector: 'app-listado-dispositivos',
  templateUrl: './listado-dispositivos.page.html',
  styleUrls: ['./listado-dispositivos.page.scss'],
  standalone: true,
  imports: [TiempoAtrasPipe, FormsModule, IonContent, IonHeader, IonTitle, IonList, IonToolbar, CommonModule, IonButton, IonItem, IonLabel, 
          IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, RouterLink, IonToggle, ValveStatusDirective], 
})
export class ListadoDispositivosPage implements OnInit, OnDestroy {

  dispositivo: any = null; 
  estadoValvula: boolean = false;
  lastMeasurementDate: Date | null = null;
  lastMeasurementValue: string | null = null;

  constructor(
    public dispositivoService: DispositivoService,
    private _actRouter: ActivatedRoute
  ) {}

  async ngOnInit() {

    const id = this._actRouter.snapshot.paramMap.get('id');
    console.log("Id del dispositivo", id);

    //Cargo los datos del dispositivo (creo que este paso debería evitarse)
    await this.dispositivoService.getDispositivos()
      .then((res: any[]) => {
        this.dispositivo = res.find(d => d.dispositivoId == id);
        console.log("Dispositivo seleccionado:", this.dispositivo);
      })
      .catch((error) => {
        console.log(error);
      });
      console.log("Dispositivo ID:", this.dispositivo.dispositivoId);

    //Cargo la última medición  
    await this.dispositivoService.getLastMedicionByDispositivoId(Number(id))
      .then(lastMedicion => {
        this.lastMeasurementDate = new Date(lastMedicion.fecha);
        this.lastMeasurementValue = lastMedicion.valor;
      })
    // Cargo el estado de la válvula
    await this.dispositivoService.getEstadoValvula(Number(id))
    .then(res => {
      this.estadoValvula = res.estadoValvula;
    });
  }

  async onToggle() {
    const id = this._actRouter.snapshot.paramMap.get('id');
    const estadoValvula = this.estadoValvula;
    await this.dispositivoService.postDispositivo(estadoValvula,Number(id))
  }

  ngOnDestroy() {}
}