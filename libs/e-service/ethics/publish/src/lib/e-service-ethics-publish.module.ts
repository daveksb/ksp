import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '@ksp/shared/ui/page-not-found';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';

export const routes: Routes = [
  {
    path: 'verdict', // ตรวจสอบและเผยแพร่คำวินิจฉัย
    component: EServiceContainerPageComponent,
    children: [
      {
        path: '',
        component: PageNotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class EServiceEthicsPublishModule {}
