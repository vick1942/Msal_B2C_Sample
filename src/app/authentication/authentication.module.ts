import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationSandbox } from './sandbox/authentication.sandbox';
import { MSALService } from './service/msal.service';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from './service/auth.service';
import { AuthenticationGuard } from './authentication.guard';
import { JwtHelper } from 'angular2-jwt';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
    ],
    declarations: [LoginComponent],
    providers: [AuthenticationSandbox, MSALService, AuthService, AuthenticationGuard, JwtHelper],
    exports: [LoginComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthenticationModule {

}
