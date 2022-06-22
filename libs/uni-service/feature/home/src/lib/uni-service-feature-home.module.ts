import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniServiceHomeComponent } from './uni-service-home/uni-service-home.component';
import { SelfServiceFormModule } from '@ksp/self-service/form';
import { MatTableModule } from '@angular/material/table';
import { TopNavComponent } from '@ksp/shared/menu';

@NgModule({
  imports: [
    CommonModule,
    SelfServiceFormModule,
    MatTableModule,
    TopNavComponent,
  ],
  declarations: [UniServiceHomeComponent],
})
export class UniServiceFeatureHomeModule {}
