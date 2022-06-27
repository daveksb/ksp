import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolContainerPageComponent } from './school-container-page/school-container-page.component';
import { RouterModule } from '@angular/router';
import { SharedMenuModule } from '@ksp/shared/menu';
import { BottomNavComponent } from '@ksp/shared/menu';

@NgModule({
  imports: [CommonModule, SharedMenuModule, BottomNavComponent, RouterModule],
  declarations: [SchoolContainerPageComponent],
  exports: [SchoolContainerPageComponent],
})
export class SchoolServiceFeatureContainerPageModule {}
