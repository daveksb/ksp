import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { File_UPLOAD_URLS, FileUploadUrls } from '@ksp/shared/form/file-upload';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';

const fileUrls: FileUploadUrls = {
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
      provide: File_UPLOAD_URLS,
      useValue: fileUrls,
    },
    { provide: MAT_DATE_LOCALE, useValue: 'th-TH' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
