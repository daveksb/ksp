import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestDataListComponent } from './test-data-list/test-data-list.component';
import { TestDataDetailComponent } from './test-data-detail/test-data-detail.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TestDataListComponent, TestDataDetailComponent],
  exports: [TestDataListComponent, TestDataDetailComponent],
})
export class UniServiceFeatureTestDataResultModule {}
