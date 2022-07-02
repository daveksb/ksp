import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPageComponent } from './list-page/list-page.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { TopNavComponent } from '@ksp/shared/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { AccusationSearchComponent } from '@ksp/shared/search';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    TopNavComponent,
    ReactiveFormsModule,
    AccusationSearchComponent,
  ],
  declarations: [ListPageComponent],
})
export class EServiceEthicsListPageModule {}
