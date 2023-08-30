import {
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';

@Directive({
  selector: '[appWhenVisible]',
  standalone: true
})
export class WhenVisibleDirective implements OnInit, OnDestroy {
  @Output() appWhenVisible = new EventEmitter();

  private observer: IntersectionObserver | undefined;

  constructor(private element: ElementRef) {}

  ngOnInit() {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.appWhenVisible.emit();
      }
    }, {});

    this.observer.observe(this.element.nativeElement);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
