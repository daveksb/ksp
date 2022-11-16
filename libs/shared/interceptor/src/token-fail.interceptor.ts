import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@ksp/shared/dialog';

@Injectable({
  providedIn: 'root',
})
export class TokenFailInterceptor implements HttpInterceptor {
  constructor(public dialog: MatDialog) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((evt) => {
        if (evt instanceof HttpResponse) {
          if (evt.body && evt.body.returnmessage === 'token fail') {
            //console.log('evt.body = ', evt.body.returnmessage);
            this.dialog.open(ConfirmDialogComponent, {
              data: {
                title: `Session หมดอายุ กรุณา Login ใหม่`,
              },
            });
          }
        }
      })
    );
  }
}
