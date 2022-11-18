import { Pipe, PipeTransform } from '@angular/core';
import { EUniApproveProcess } from '@ksp/shared/constant';
import _ from 'lodash';

@Pipe({
  name: 'eUniCertificationStatus',
  pure: false,
  standalone: true,
})
export class EUniCertificationStatusPipe implements PipeTransform {
  transform(value: any) {
    if (value?.process === '4') {
      return value.status === '1' ? 'พิจารณารับรอง' : 'ไม่พิจารณารับรอง';
    }
    if (value?.process === '5') {
      return value.status === '1' ? 'ผ่านการรับรอง/พิจารณา' : 'ไม่ผ่านการรับรอง/พิจารณา';
    }
    return '';
  }
}
