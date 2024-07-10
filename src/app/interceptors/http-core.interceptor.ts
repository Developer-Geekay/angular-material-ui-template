import { HttpInterceptorFn } from '@angular/common/http';

export const httpCoreInterceptor: HttpInterceptorFn = (req, next) => {
  let request = req.clone({
    setHeaders: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });

  return next(request);
};
