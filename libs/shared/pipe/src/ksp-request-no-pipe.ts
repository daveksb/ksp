import { Pipe, PipeTransform } from '@angular/core';
import { formatRequestNo } from '@ksp/shared/utility';
@Pipe({
  name: 'reqNoFormat',
  pure: true,
  standalone: true,
})
export class RequestNoPipe implements PipeTransform {
  transform(input: string) {
    return formatRequestNo(input);
  }
}
