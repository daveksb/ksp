import { Pipe, PipeTransform } from '@angular/core';
import { formatIdCard } from '@ksp/shared/utility';
@Pipe({
  name: 'idCardFormat',
  pure: true,
  standalone: true,
})
export class IdCardPipe implements PipeTransform {
  transform(input: string) {
    return formatIdCard(input);
  }
}
