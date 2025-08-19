import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appValveStatus]',
standalone: true, 
})
export class ValveStatusDirective implements OnChanges {
  @Input() appValveStatus: boolean = false;
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    const color = this.appValveStatus ? 'green' : 'red';
    this.renderer.setStyle(this.el.nativeElement, 'color', color);
  }
}
