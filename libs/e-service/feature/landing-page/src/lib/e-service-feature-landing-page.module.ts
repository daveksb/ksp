import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LandingPageComponent],
  exports: [LandingPageComponent],
})
export class EServiceFeatureLandingPageModule {}
