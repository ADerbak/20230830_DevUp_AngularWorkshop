import {
  animate,
  query,
  stagger,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

function background(backgroundColor: string) {
  return style({ backgroundColor });
}

// https://www.youtube.com/watch?v=_mC6KY3IaO0
const romanShades = query(
  ':enter',
  [
    style({ opacity: 0, transform: 'translateY(-15px)' }),
    stagger(
      '0.5s',
      animate(
        '0.5s ease-out',
        style({ opacity: 1, transform: 'translateY(0px)' })
      )
    )
  ],
  { optional: true }
);

export const listArrival = trigger('listArrival', [
  transition(':enter', [romanShades])
]);

export const changeStatus = trigger('changeStatus', [
  state('New', background('white')),
  state('In Progress', background('#f79f8c')),
  state('In Review', background('#82d7fd')),
  state('Complete', background('#8efd82')),
  transition('* <=> *', [animate('1s')])
]);
