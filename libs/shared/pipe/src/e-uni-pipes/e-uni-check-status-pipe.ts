import { Pipe, PipeTransform } from '@angular/core';
import { EUniApproveProcess } from '@ksp/shared/constant';
import _ from 'lodash';

@Pipe({
  name: 'eUniCheckStatus',
  pure: false,
  standalone: true,
})
export class EUniCheckStatusPipe implements PipeTransform {
  transform(value: any) {    
    return  _.find(EUniApproveProcess,{processId:_.toNumber(value?.process)})?.processName || ""
  }
}
