import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'thaiDate',
  pure: false,
  standalone: true,
})
export class ThaiDatePipe implements PipeTransform {
  transform(value: string | null | undefined) {
    if (value) {
      const date = new Date(value);
      return date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } else {
      return null;
    }
  }
}
