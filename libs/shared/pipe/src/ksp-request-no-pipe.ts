import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'reqNoFormat',
  pure: true,
  standalone: true,
})
export class RequestNoPipe implements PipeTransform {
  transform(input: string) {
    if (!input.includes('-')) {
      const s1 = input.slice(0, 1);
      const s2 = input.slice(1, 3);
      const s3 = input.slice(3, 4);
      const s4 = input.slice(4, 10);
      const s5 = input.slice(10);
      return `${s1}-${s2}-${s3}-${s4}-${s5}`;
    } else {
      return input;
    }
  }
}
