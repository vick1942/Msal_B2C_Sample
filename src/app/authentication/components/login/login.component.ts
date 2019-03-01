import { Component, OnInit } from '@angular/core';
import { MSALService } from '../../service/msal.service';
import { Router } from '@angular/router';
import { AuthenticationSandbox } from '../../sandbox/authentication.sandbox';

@Component({
  selector: 'ccw-auth',
  template: '<span> <p>Token: {{token}}</p>'
})
export class LoginComponent implements OnInit {

  user: any;
  token:string;
  constructor(private authSandbox: AuthenticationSandbox) {

  }

  ngOnInit() {

    const token: string = this.authSandbox.getToken();
    if (token === null || token === undefined || token === 'null') {
      this.authSandbox.login();
    }
    this.user=this.authSandbox.getUser();
    this.token=this.authSandbox.getToken();
  }

}
