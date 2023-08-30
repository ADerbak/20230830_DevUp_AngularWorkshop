import {
  animate,
  group,
  query,
  style,
  transition,
  trigger
} from '@angular/animations';

function slideAndFade(
  startX: number,
  endX: number,
  endOpacity: number
) {
  const opacity = 1 - endOpacity;
  return [
    style({ transform: `translateX(${startX}%)`, opacity }),
    animate(
      '1s ease-in-out',
      style({
        transform: `translateX(${endX}%)`,
        opacity: endOpacity
      })
    )
  ];
}

const slideLeft = group([
  query(':enter', slideAndFade(100, 0, 1), { optional: true }),
  query(':leave', slideAndFade(0, -100, 0), { optional: true })
]);

const slideRight = group([
  query(':enter', slideAndFade(-100, 0, 1), { optional: true }),
  query(':leave', slideAndFade(0, 100, 0), { optional: true })
]);

export const routeChange = trigger('routeChange', [
  transition('EmployeeProcessing => FluidCMS', [slideLeft]),
  transition('EmployeeProcessing => StaticCMS', [slideLeft]),
  transition('EmployeeProcessing => SiliconWafers', [slideLeft]),
  transition('SiliconWafers => EmployeeProcessing', [slideRight]),
  transition('SiliconWafers => FluidCMS', [slideLeft]),
  transition('SiliconWafers => StaticCMS', [slideLeft]),
  transition('FluidCMS => EmployeeProcessing', [slideRight]),
  transition('FluidCMS => SiliconWafers', [slideRight]),
  transition('FluidCMS => StaticCMS', [slideLeft]),
  transition('StaticCMS => EmployeeProcessing', [slideRight]),
  transition('StaticCMS => FluidCMS', [slideRight]),
  transition('StaticCMS => SiliconWafers', [slideRight])
]);
