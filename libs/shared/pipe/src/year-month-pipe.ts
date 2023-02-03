import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'yearMonth',
  pure: false,
  standalone: true,
})
export class YearMonthPipe implements PipeTransform {
  transform(value: number | null | undefined, format: 'month' | 'year') {
    if (value) {
      const month = Math.floor(+value / 30);
      if (format === 'year') {
        return Math.floor(+month / 12);
      } else {
        return +month % 12;
      }
    } else {
      return 0;
    }
  }
}
