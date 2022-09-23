import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  CacheInterceptor,
  TokenHandleInterceptor,
} from '@ksp/shared/interceptor';
import { File_UPLOAD_URLS, FileUploadUrls } from '@ksp/shared/form/file-upload';

const fileUrls: FileUploadUrls = {
  upload: '/kspstaff/schrequestfileinsert',
  delete: '/kspstaff/schrequestfiledelete',
  download: '/kspstaff/schrequestfileselectbyid',
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTooltipModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
