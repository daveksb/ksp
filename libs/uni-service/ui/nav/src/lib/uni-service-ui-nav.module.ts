import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniServiceTopNavComponent } from './uni-service-top-nav/uni-service-top-nav.component';

@NgModule({
  imports: [CommonModule],
  declarations: [UniServiceTopNavComponent],
  exports: [UniServiceTopNavComponent],
})
export class UniServiceUiNavModule {}
