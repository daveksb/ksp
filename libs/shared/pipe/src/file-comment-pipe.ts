import { Pipe, PipeTransform } from '@angular/core';
import { KspCheckResult } from '@ksp/shared/interface';
@Pipe({
  name: 'fileComment',
  pure: false,
  standalone: true,
})
export class FileCommentPipe implements PipeTransform {
  transform(value: KspCheckResult[]) {
    if (value?.length > 0) {
      return value
        .map((item) => item.detail)
        .filter(Boolean)
        .join(', ');
    } else {
      return '';
    }
  }
}
