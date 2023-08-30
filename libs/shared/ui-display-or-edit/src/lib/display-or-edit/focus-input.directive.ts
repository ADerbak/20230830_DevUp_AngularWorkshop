import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[oasisFocusInput]'
})
export class FocusInputDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.el.nativeElement.focus();
  }
}
