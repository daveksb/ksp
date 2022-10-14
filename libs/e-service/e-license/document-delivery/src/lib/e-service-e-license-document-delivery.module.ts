import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookReceiveListComponent } from './book-receive-list/book-receive-list.component';
import { BookReceiveDetailComponent } from './book-receive-detail/book-receive-detail.component';
import { BookReserveListComponent } from './book-reserve-list/book-reserve-list.component';
import { BookReserveDetailComponent } from './book-reserve-detail/book-reserve-detail.component';
import { BookRegisterListComponent } from './book-register-list/book-register-list.component';
import { BookSendListComponent } from './book-send-list/book-send-list.component';
import { StatusCheckListComponent } from './status-check-list/status-check-list.component';
import { StatusCheckDetailComponent } from './status-check-detail/status-check-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { BottomNavComponent, TopNavComponent } from '@ksp/shared/menu';
import { MatTableModule } from '@angular/material/table';
import { BookReceiveDetailPersonComponent } from './book-receive-detail-person/book-receive-detail-person.component';
import { BookReceiveDetailAgencyComponent } from './book-receive-detail-agency/book-receive-detail-agency.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AddRowButtonComponent,
  RequestHeaderInfoComponent,
} from '@ksp/shared/ui';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';

export const routes: Routes = [
  {
    path: '',
    component: EServiceContainerPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'receive-list',
        component: BookReceiveListComponent,
      },
      {
        path: 'receive-detail',
        component: BookReceiveDetailComponent,
      },
      {
        path: 'register-list',
        component: BookRegisterListComponent,
      },
      {
        path: 'reserve-list',
        component: BookReserveListComponent,
      },
      {
        path: 'reserve-detail',
        component: BookReserveDetailComponent,
      },
      {
        path: 'send-list',
        component: BookSendListComponent,
      },
      {
        path: 'check-list',
        component: StatusCheckListComponent,
      },
      {
        path: 'check-detail',
        component: StatusCheckDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TopNavComponent,
    MatTableModule,
    BottomNavComponent,
    BookReceiveDetailPersonComponent,
    BookReceiveDetailAgencyComponent,
    ReactiveFormsModule,
    RequestHeaderInfoComponent,
    MatDialogModule,
    AddRowButtonComponent,
    MatDatepickerModule,
  ],
  declarations: [
    BookReceiveListComponent,
    BookReceiveDetailComponent,
    BookReserveListComponent,
    BookReserveDetailComponent,
    BookRegisterListComponent,
    BookSendListComponent,
    StatusCheckListComponent,
    StatusCheckDetailComponent,
  ],
  exports: [
    BookReceiveListComponent,
    BookReceiveDetailComponent,
    BookReserveListComponent,
    BookReserveDetailComponent,
    BookRegisterListComponent,
    BookSendListComponent,
    StatusCheckListComponent,
    StatusCheckDetailComponent,
  ],
})
export class EServiceELicenseDocumentDeliveryModule {}
