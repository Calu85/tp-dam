import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton } from '@ionic/angular/standalone';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DispositivoService } from '../services/dispositivo.service';

@Component({
  selector: 'app-mediciones',
  templateUrl: './mediciones.page.html',
  styleUrls: ['./mediciones.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, RouterLink],
})
export class MedicionesPage implements OnInit {

  mediciones: any[] = [];
  dispositivoId: string | null = null;

  constructor(
    private _actRouter: ActivatedRoute,
    private dispositivoService: DispositivoService
  ) {}

  ngOnInit() {
    // Subscribe to route param changes
    this._actRouter.paramMap.subscribe(async params => {
      this.dispositivoId = params.get('id');

      if (this.dispositivoId) {
        try {
          //console.log("Llamada al backend: http://localhost:8000/mediciones/" + this.dispositivoId);
          this.mediciones = await this.dispositivoService.getMedicionesByDispositivoId(+this.dispositivoId);
          console.log("Mediciones:", this.mediciones);
        } catch (err) {
          console.error("Error fetching mediciones:", err);
        }
      }
    });
  }
}