import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'engDate',
  pure: false,
  standalone: true,
})
export class EngDatePipe implements PipeTransform {
  transform(value: string | null | undefined) {
    if (value) {
      const date = new Date(value);
      return date.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } else {
      return null;
    }
  }
}
