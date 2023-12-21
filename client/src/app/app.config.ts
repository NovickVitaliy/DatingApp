import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {routes} from './app.routes';
import {HttpClientModule, provideHttpClient, withInterceptors} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {ToastrModule} from "ngx-toastr";
import {errorInterceptor} from "./_interceptors/error.interceptor";
import {jwtInterceptor} from "./_interceptors/jwt.interceptor";
import {TabsModule} from "ngx-bootstrap/tabs";
import {NgxSpinnerModule} from "ngx-spinner";
import {loadingInterceptor} from "./_interceptors/loading.interceptor";
import {FileUploadModule} from "ng2-file-upload";
import {BsDatepickerConfig, BsDatepickerModule} from "ngx-bootstrap/datepicker";

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
    provideHttpClient(withInterceptors([errorInterceptor, jwtInterceptor, loadingInterceptor])),
    importProvidersFrom(TabsModule.forRoot()),
    importProvidersFrom(NgxSpinnerModule.forRoot({
      type: "line-scale-part"
    })),
    importProvidersFrom(FileUploadModule),
    importProvidersFrom(ReactiveFormsModule),
    importProvidersFrom(BsDatepickerModule.forRoot())],
};
