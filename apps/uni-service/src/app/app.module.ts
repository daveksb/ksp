import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatDialogConfig,
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { File_UPLOAD_URLS, FileUrls } from '@ksp/shared/form/file-upload';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import {
  CacheInterceptor,
  LoadingInterceptor,
  TokenHandleInterceptor,
} from '@ksp/shared/interceptor';

const fileUrls: FileUrls = {
  uploadFile: '/kspuni/unirequestfilesinsert',
  uploadImage: '',
  download: '/kspuni/unirequestfileselectfile',
  delete: '/kspuni/unirequestfiledelete',
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatMenuModule,
    MatTooltipModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
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
