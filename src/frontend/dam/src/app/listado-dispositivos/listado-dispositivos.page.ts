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

  // observable$: Observable<any>
  // subscription: Subscription
  dispositivos: any = []

  mouseMove$ = fromEvent(document, 'mousemove')

  @Input()
  id = '';

  ionViewWillEnter () {
    console.log(this._actRouter.snapshot.paramMap.get('id'))
  }

  constructor(public dispositivoService: DispositivoService,
              private _actRouter: ActivatedRoute) {
    // this.observable$ = interval(1000)
    // this.subscription = this.observable$.subscribe((value) => {
    //   console.log(value)
    // })

    // this.subscription = this.mouseMove$.subscribe((evt: any) => {
    //   console.log(`Mouse en: ${evt.clientX} x ${evt.clientY} y`)
    // })
  }

  // subscribe () {
  //   this.subscription = this.mouseMove$.subscribe((evt: any) => {
  //     console.log(`Coordenadas de algo: ${evt.clientX} x ${evt.clientY} y`)
  //   })
  // }

  // unsubscribe () {
  //   this.subscription.unsubscribe()
  // }

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
    // this.subscription.unsubscribe()
  }
}
