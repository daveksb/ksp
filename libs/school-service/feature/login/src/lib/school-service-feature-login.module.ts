import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolServiceLoginComponent } from './school-service-login/school-service-login.component';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, MatIconModule, ReactiveFormsModule],
  declarations: [SchoolServiceLoginComponent],
  exports: [SchoolServiceLoginComponent],
})
export class SchoolServiceFeatureLoginModule {}
