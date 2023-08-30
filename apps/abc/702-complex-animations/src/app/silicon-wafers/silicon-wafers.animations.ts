import {
  animate,
  style,
  transition,
  trigger
} from '@angular/animations';

export const updateSimulation = trigger('updateSimulation', [
  transition(
    '* <=> *',
    [
      style({ height: '0px' }),
      animate('{{etchTime}}s', style({ height: '{{etchDepth}}px' }))
    ],
    { params: { etchTime: 0, etchDepth: 0 } }
  )
]);
