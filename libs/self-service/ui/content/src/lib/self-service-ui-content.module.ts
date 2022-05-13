import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { RegisterCompletedComponent } from './register-completed/register-completed.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PrivacyPolicyComponent, RegisterCompletedComponent],
  exports: [PrivacyPolicyComponent, RegisterCompletedComponent],
})
export class SelfServiceUiContentModule {}
