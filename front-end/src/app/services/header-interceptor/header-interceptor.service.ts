import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest
} from '@angular/common/http';

import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import {Observable} from 'rxjs/Observable';

export class HeaderInterceptorService implements HttpInterceptor {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the new header
    const clonedRequest = req.clone({ headers: req.headers.set('PuzzleHubToken', this.getCookie('PuzzleHubToken')) });
    
    // Pass the cloned request instead of the original request to the next handle
    return next.handle(clonedRequest);
  }

  getCookie(cookieName) {
    if(isPlatformBrowser(this.platformId)) {
      var name = cookieName + '=';
      var cookies = document.cookie.split(';');
      for(var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while(cookie.charAt(0) === ' ') {
          cookie = cookie.substring(1);
        }

        if(cookie.indexOf(cookieName) === 0) {
          return cookie.substring(cookieName.length + 1, cookie.length);
        }
      }
    }

    return "";
  }
}
