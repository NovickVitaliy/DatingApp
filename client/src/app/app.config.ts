import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {routes} from './app.routes';
import {HttpClientModule, provideHttpClient, withInterceptors} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {ToastrModule} from "ngx-toastr";
import {errorInterceptor} from "./_interceptors/error.interceptor";
import {jwtInterceptor} from "./_interceptors/jwt.interceptor";
import {TabsModule} from "ngx-bootstrap/tabs";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(FormsModule),
  importProvidersFrom(BsDropdownModule),
  importProvidersFrom(ToastrModule.forRoot({
    positionClass: "toast-bottom-right"
  })),
  importProvidersFrom(BrowserAnimationsModule),
  provideHttpClient(withInterceptors([errorInterceptor, jwtInterceptor])),
  importProvidersFrom(TabsModule.forRoot())],
};
