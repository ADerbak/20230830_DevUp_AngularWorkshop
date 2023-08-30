import {
  animate,
  keyframes,
  style,
  transition,
  trigger
} from '@angular/animations';

export const overshootWidth = trigger('overshootWidth', [
  transition(':enter', [
    animate(
      '1.5s ease-out',
      // The keyframes function allows for multiple styles in an animation, apart from 'start' and 'end'
      // This animation cannot be done easily in CSS transitions
      keyframes([
        style({ width: 0, offset: 0 }),
        style({ width: '100%', offset: 0.7 }),
        style({ width: '*', offset: 1 })
      ])
    )
  ])
]);
