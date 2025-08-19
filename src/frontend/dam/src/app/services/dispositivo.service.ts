import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService {

  constructor(private _http: HttpClient) { }

  getDispositivos () {
    // return firstValueFrom(this._http.get("http://localhost:8000/dispositivos"))
    return firstValueFrom(this._http.get<any[]>("http://localhost:8000/dispositivos"))
  };

  postDispositivo(estadoValvula: boolean, medicion: number, id: number) {
    const dataToSend = {
      id: id,
      estadoValvula: estadoValvula,
      medicion: medicion
    };
    return firstValueFrom(this._http.post<any[]>(`http://localhost:8000/dispositivos/${id}`, dataToSend))
  };

  getMedicionesByDispositivoId(id: number) {
    return firstValueFrom(this._http.get<any[]>(`http://localhost:8000/mediciones/${id}`));
  }
}
