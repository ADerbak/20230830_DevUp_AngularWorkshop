import {
  animate,
  style,
  transition,
  trigger
} from '@angular/animations';

export const shrinkTextOnUpdate = trigger('shrinkTextOnUpdate', [
  transition(
    '* <=> *',
    [
      style({ 'font-size': '45px' }),
      animate(
        '{{animationSpeed}}ms',
        style({ 'font-size': '{{size}}px' })
      )
    ],
    { params: { animationSpeed: 500, size: 50 } }
  )
]);
