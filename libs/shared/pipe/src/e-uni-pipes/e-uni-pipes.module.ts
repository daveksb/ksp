import { EUniConsiderationStatusPipe } from './e-uni-consideration-status-pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EUniCheckStatusPipe } from './e-uni-check-status-pipe';
import { EUniCertificationStatusPipe } from './e-uni-certification-status-pipe';
import { EUniCheckPipe } from './e-uni-check-pipe';
import { EUniConsiderationPipe } from './e-uni-consideration-pipe';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EUniCheckStatusPipe,
    EUniConsiderationStatusPipe,
    EUniCertificationStatusPipe,
    EUniCheckPipe,
    EUniConsiderationPipe
  ],
  exports: [
    EUniCheckStatusPipe,
    EUniConsiderationStatusPipe,
    EUniCertificationStatusPipe,
    EUniCheckPipe,
    EUniConsiderationPipe
  ],
})
export class EUniPipesModule {}
