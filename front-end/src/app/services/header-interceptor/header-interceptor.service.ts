import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest
} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

export class HeaderInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // Clone the request to add the new header
      const clonedRequest = req.clone({ headers: req.headers.set('PuzzleHubToken', this.getCookie('PuzzleHubToken')) });

      // Pass the cloned request instead of the original request to the next handle
      return next.handle(clonedRequest);
    }

    getCookie(cookieName) {
      let name = cookieName + '=';
      let cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
          cookie = cookie.substring(1);
        }

        if (cookie.indexOf(cookieName) === 0) {
          return cookie.substring(cookieName.length + 1, cookie.length);
        }
      }

      return '';
    }
}
