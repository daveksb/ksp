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
import { CompleteDialogComponent } from '@ksp/shared/dialog';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TokenFailInterceptor implements HttpInterceptor {
  constructor(public dialog: MatDialog, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((evt) => {
        if (evt instanceof HttpResponse) {
          if (evt.body && evt.body.returnmessage === 'token fail') {
            //console.log('evt.body = ', evt.body.returnmessage);
            const dialog = this.dialog.open(CompleteDialogComponent, {
              data: {
                header: `Session หมดอายุ กรุณา Login ใหม่อีกครั้ง`,
                btnLabel: 'เข้าสู่ระบบ',
              },
            });
            dialog.componentInstance.completed.subscribe(() => {
              this.router.navigate(['/login']);
            });
          }
        }
      })
    );
  }
}
