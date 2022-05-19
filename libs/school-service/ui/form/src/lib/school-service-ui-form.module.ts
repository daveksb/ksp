import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAddressComponent } from './school-address/school-address.component';
import { EducationInfoComponent } from './education-info/education-info.component';
import { TeachingInfoComponent } from './teaching-info/teaching-info.component';
import { ReasonInfoComponent } from './reason-info/reason-info.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    SchoolAddressComponent,
    EducationInfoComponent,
    TeachingInfoComponent,
    ReasonInfoComponent,
  ],
  exports: [
    SchoolAddressComponent,
    EducationInfoComponent,
    TeachingInfoComponent,
    ReasonInfoComponent,
  ],
})
export class SchoolServiceUiFormModule {}
