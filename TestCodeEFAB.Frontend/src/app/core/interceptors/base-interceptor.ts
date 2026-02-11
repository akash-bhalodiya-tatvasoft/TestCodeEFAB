import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {
  APP_CONSTANTS,
  APP_ROUTE,
  HTTP_ERROR_CODES,
  HTTP_ERROR_MESSAGES
} from '../../shared';
import { ApiResponse } from '../models';

export const BaseInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<HttpEvent<any>> => {
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);
  const token = localStorage.getItem(APP_CONSTANTS.KEYS.TOKEN);

  // Apply environment apiEndpoint and Token
  const authReq = req.clone({
    url: `${environment.apiEndpoint}${req.url}`,
    setHeaders: token
      ? {
          Authorization: `${APP_CONSTANTS.KEYS.TOKEN_SCHEMA}${token}`,
        }
      : {},
  });

  return next(authReq).pipe(
    tap((event) => {
      if (event instanceof HttpResponse && event.status >= 200 && event.status < 300) {
        const body = event.body as ApiResponse<any>;
        const message = body?.message;
        const writeMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];
        const isSearchOperation = req.url.includes('list') || req.url.includes('search');
        if (message && writeMethods.includes(req.method) && !isSearchOperation) {
          snackBar.open(message, 'Close', { panelClass: ['success-snackbar'] });
        }
      }
    }),
    catchError((error: HttpErrorResponse) => {
      let errorMessage = HTTP_ERROR_MESSAGES.DEFAULT;

      if (error.error instanceof ErrorEvent) {
        errorMessage = error.error.message;
      } else {
        switch (error.status) {
          case HTTP_ERROR_CODES.UNAUTHORIZED:
            errorMessage = HTTP_ERROR_MESSAGES.UNAUTHORIZED;
            router.navigate([`/${APP_ROUTE.LOGIN}`]);
            break;

          case HTTP_ERROR_CODES.FORBIDDEN:
            errorMessage = HTTP_ERROR_MESSAGES.FORBIDDEN;
            break;

          case HTTP_ERROR_CODES.NOT_FOUND:
            errorMessage = HTTP_ERROR_MESSAGES.NOT_FOUND;
            break;

          case HTTP_ERROR_CODES.INTERNAL_SERVER_ERROR:
            errorMessage = HTTP_ERROR_MESSAGES.INTERNAL_SERVER_ERROR;
            break;
        }
      }

      snackBar.open(errorMessage, 'Error', { panelClass: ['error-snackbar'] });
      return throwError(() => ({
        status: error.status,
        message: errorMessage,
        originalError: error,
      }));
    }),

    finalize(() => {
      // loader hide / cleanup logic here if needed
    }),
  );
};
