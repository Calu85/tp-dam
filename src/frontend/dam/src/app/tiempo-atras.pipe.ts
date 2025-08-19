import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tiempoAtras',
  standalone: true
})
export class TiempoAtrasPipe implements PipeTransform {

  transform(value: Date | string): string {
    if (!value) return '';

    const date = new Date(value);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'recién';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `hace ${minutes} minuto${minutes > 1 ? 's' : ''}`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `hace ${hours} hora${hours > 1 ? 's' : ''}`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `hace ${days} día${days > 1 ? 's' : ''}`;
    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `hace ${weeks} semana${weeks > 1 ? 's' : ''}`;
    const months = Math.floor(days / 30);
    if (months < 12) return `hace ${months} mese${months > 1 ? 's' : ''}`;
    const years = Math.floor(days / 365);
    return `hace ${years} año${years > 1 ? 's' : ''}`;
  }

}
