import { Pipe, PipeTransform } from '@angular/core';
import { EUniApproveProcess } from '@ksp/shared/constant';
import _ from 'lodash';

@Pipe({
  name: 'eUniConsiderationStatus',
  pure: false,
  standalone: true,
})
export class EUniConsiderationStatusPipe implements PipeTransform {
  transform(value:any) {    
    return  _.find(EUniApproveProcess,{processId:_.toNumber(value?.process)})?.considerationName || ""
  }
}
