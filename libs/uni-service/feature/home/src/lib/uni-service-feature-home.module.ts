import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniServiceHomeComponent } from './uni-service-home/uni-service-home.component';
import { SelfServiceFormModule } from '@ksp/self-service/form';
import { MatTableModule } from '@angular/material/table';
import { TopNavComponent } from '@ksp/shared/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { DegreeSearchComponent } from '@ksp/shared/search';

@NgModule({
  imports: [
    CommonModule,
    SelfServiceFormModule,
    MatTableModule,
    TopNavComponent,
    ReactiveFormsModule,
    DegreeSearchComponent,
    ReactiveFormsModule,
  ],
  declarations: [UniServiceHomeComponent],
})
export class UniServiceFeatureHomeModule {}
