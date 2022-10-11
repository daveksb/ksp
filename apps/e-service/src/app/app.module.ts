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
  TokenHandleInterceptor,
} from '@ksp/shared/interceptor';
import { MatMenuModule } from '@angular/material/menu';
import { FileUploadUrls, File_UPLOAD_URLS } from '@ksp/shared/form/file-upload';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

const fileUrls: FileUploadUrls = {
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
