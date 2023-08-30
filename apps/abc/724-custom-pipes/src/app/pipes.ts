import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkmark',
  standalone: true
})
export class CheckmarkPipe implements PipeTransform {
  transform(input: unknown) {
    const checkMark = '\u2713';
    const xMark = '\u2718';
    return input ? checkMark : xMark;
  }
}

@Pipe({
  name: 'sentenceCase',
  standalone: true
})
export class SentenceCasePipe implements PipeTransform {
  transform(input: string) {
    return (
      input.slice(0, 1).toUpperCase() + input.toLowerCase().slice(1)
    );
  }
}

@Pipe({
  name: 'containsX',
  standalone: true
})
export class ContainsXPipe implements PipeTransform {
  transform(collection: string[], searchTerm: string) {
    if (collection?.filter) {
      return collection.filter(v => v.indexOf(searchTerm) > -1);
    }
    return collection;
  }
}

@Pipe({
  name: 'fieldRange',
  standalone: true
})
export class FieldRangePipe implements PipeTransform {
  transform<T, F extends keyof T>(
    input: T[],
    fieldName: F,
    lower: T[F],
    upper: T[F]
  ) {
    return input.filter(
      v => v[fieldName] >= lower && v[fieldName] <= upper
    );
  }
}

@Pipe({
  name: 'defaultToString',
  standalone: true
})
export class DefaultToStringPipe implements PipeTransform {
  transform(input: string | null | undefined) {
    return input ?? '';
  }
}
