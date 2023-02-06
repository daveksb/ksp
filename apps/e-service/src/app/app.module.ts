import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routing.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  CacheInterceptor,
  LoadingInterceptor,
  TokenFailInterceptor,
  TokenHandleInterceptor,
} from '@ksp/shared/interceptor';
import { MatMenuModule } from '@angular/material/menu';
import { FileUrls, File_UPLOAD_URLS } from '@ksp/shared/form/file-upload';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatDialogConfig,
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';

const fileUrls: FileUrls = {
  uploadFile: '/e-service/kspfileinsert',
  uploadImage: '',
  download: '/e-service/kspfileselectidfile',
  delete: '/e-service/kspfiledelete',
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatMenuModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDialogModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenHandleInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenFailInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true,
    },
    {
      provide: File_UPLOAD_URLS,
      useValue: fileUrls,
    },
    { provide: MAT_DATE_LOCALE, useValue: 'th-TH' },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        ...new MatDialogConfig(),
        width: '350px',
      } as MatDialogConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
