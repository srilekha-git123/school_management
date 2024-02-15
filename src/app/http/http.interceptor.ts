import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { map, catchError, finalize, timeout } from 'rxjs/operators';
import { HttpError } from './http-error';
const APP_XHR_TIMEOUT = 30000;

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor() { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next
      .handle(this.performRequest(req))
      .pipe(
        timeout(APP_XHR_TIMEOUT),
        map((res) => this.handleSuccessfulResponse(res)),
        finalize(this.handleRequestCompleted.bind(this))
      );
  }

  public performRequest(req: HttpRequest<any>): HttpRequest<any> {
    let headers: HttpHeaders = req.headers;
    let token = sessionStorage.getItem('session');
    if(token) token = "Bearer "+token;
    else  token = 'Bearer ';
    headers = headers.set('Authorization', token);
    return req.clone({ headers: headers }); 
  }

  public handleSuccessfulResponse(event: any): HttpResponse<any> {
    if (event instanceof HttpResponse) {
      event = event.clone({ body: event.body.response });
    }
    return event;
  }

  // public handleErrorResponse(errorResponse: any): Observable<HttpEvent<any>> {
  //   if (errorResponse instanceof TimeoutError) {
  //     return throwError('Timeout Exception');
  //   }
  //   switch (errorResponse.status) {
  //     case 401: // Unauthorized
  //       this.snackBarService.snackBarOpen("Unauthorized, Please logout and login again");
  //       break;
  //     case 403: // Forbidden
  //       let token = sessionStorage.getItem('session');
  //       if(!token) this.snackBarService.snackBarOpen("Invalid credentials");
  //       else {
  //         this.snackBarService.snackBarOpen("Forbidden, Please logout and login again");
  //       }
  //       break;
  //     case 500: // Internal server Error
  //       this.snackBarService.snackBarOpen("Internal server Error,  Please try again");
  //       break;
  //     case 0: // Service Unavailable
  //     case 503: // Service Unavailable
  //       this.snackBarService.snackBarOpen("Internal server Error,  Service Unavailable");
  //       break; 
  //     default: // Other Error
  //       this.snackBarService.snackBarOpen( errorResponse.error?.errorMessage ? errorResponse.error.errorMessage : errorResponse.message);
  //   }
  //   ////////// if(errorResponse.status){
  //   //////////   this.snackBarService.snackBarOpen( errorResponse.error?.errorMessage ? errorResponse.error.errorMessage : errorResponse.message);
  //   ////////// }
  //   let customError = new HttpError();
  //   try {
  //     customError = HttpError.initWithCode(errorResponse.error.errors[0].code);
  //   } catch (e) { }

  //   return throwError(customError);
  // }

  private handleRequestCompleted(): void {
    // console.log(`Request finished`);
  }

}
