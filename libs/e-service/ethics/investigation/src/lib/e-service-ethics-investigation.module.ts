import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { BottomNavComponent } from '@ksp/shared/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { InvestigationDetailComponent } from './investigation-detail/investigation-detail.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AccusationRecordComponent } from '@ksp/e-service/ethics/accusation';
import { TopNavComponent } from '@ksp/shared/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { InvestigationListComponent } from './investigation-list/investigation-list.component';
import { FormInvestigationDetailComponent } from '@ksp/e-service/ethics/form';

export const routes: Routes = [
  {
    path: '', // สืบสวน
    component: EServiceContainerPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: InvestigationListComponent,
      },
      {
        path: 'detail',
        component: InvestigationDetailComponent,
      },
      {
        path: 'detail/:id',
        component: InvestigationDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    BottomNavComponent,
    RouterModule.forChild(routes),
    MatDialogModule,
    MatTabsModule,
    AccusationRecordComponent,
    TopNavComponent,
    ReactiveFormsModule,
    FormInvestigationDetailComponent,
  ],
  declarations: [InvestigationDetailComponent],
})
export class EServiceEthicsInvestigationModule {}
