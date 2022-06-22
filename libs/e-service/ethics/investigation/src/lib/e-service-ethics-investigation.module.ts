import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { BottomNavComponent } from '@ksp/shared/menu';
import { ListPageComponent } from '@ksp/e-service/ethics/list-page';
import { MatDialogModule } from '@angular/material/dialog';
import { InvestigationMainComponent } from './investigation-main/investigation-main.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AccusationRecordComponent } from '@ksp/e-service/ethics/accusation';
import { InvestigationDetailComponent } from './investigation-detail/investigation-detail.component';
import { TopNavComponent } from '@ksp/shared/menu';

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
        component: ListPageComponent,
      },
      {
        path: 'detail',
        component: InvestigationMainComponent,
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
    InvestigationDetailComponent,
    TopNavComponent,
  ],
  declarations: [InvestigationMainComponent],
  exports: [InvestigationMainComponent],
})
export class EServiceEthicsInvestigationModule {}
