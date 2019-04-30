import { Component, OnInit } from '@angular/core';
import { MSALService } from '../../service/msal.service';
import { Router } from '@angular/router';
import { AuthenticationSandbox } from '../../sandbox/authentication.sandbox';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ccw-auth',
  template: '<ngx-spinner bdColor="rgba(51, 51, 51, 0.8)" size="default" color="#fff" type="ball-clip-rotate-pulse"></ngx-spinner> <span> <p>Token: {{token}}</p> <input type="button" value="Sign In" (click)="signUpOrSignIn()" ><br/> <br/> <input type="button" value="Sign Out" (click)="signOut()" >'
})
export class LoginComponent implements OnInit {

  user: any;
  token:string;
  constructor(private authSandbox: AuthenticationSandbox, private _ngxSpinnerService: NgxSpinnerService) {
    this._ngxSpinnerService.show();
  }
  

  ngOnInit() {
    const token: string = this.authSandbox.getToken();  
    this._ngxSpinnerService.hide();
   // if (this.token === null || this.token === undefined || this.token === 'null') {
     // this.authSandbox.login();
    //}
  
  }

  signOut(){
    this.authSandbox.logout();
  }
  signUpOrSignIn(){
  this._ngxSpinnerService.show();
    if (this.token === null || this.token === undefined || this.token === 'null') {
      this.authSandbox.login();
    }
    //this.user = this.authSandbox.getUser();
   // this.token = this.authSandbox.getToken();
  }

}
