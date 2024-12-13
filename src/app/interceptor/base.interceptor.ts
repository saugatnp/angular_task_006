import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Base URL for api requests
// export const baseUrl = 'http://localhost:4200';

/**
 * 
 * @param req get the request through httpclient
 * @param next the next interceptor or backend where rqst is forwarded
 * @returns response
 */
export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const clonedRequest = req.clone({
    url: `${req.url}`
  });

  // TODO : set and get data to/from local storage
  return next(clonedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('HTTP Error:', error.message);
      return throwError(() => error);
    })
  );
};