import { Injectable } from '@angular/core';
import { UserAgentApplication } from 'msal';
import { environment } from '../../../environments/environment';

@Injectable()
export class MSALService {  
   
isErrorFound = false;
private applicationConfig: any = {
   clientID: '****-*********-*****************',
   authority: 'https://login.microsoftonline.com/tfp/*******/B2C_1_SignUpOrSignInPolicy',
  passwordauthority: 'https://login.microsoftonline.com/tfp/*******/B2C_1_PasswordReset', 
  b2cScopes: ['https://{environment}/user_impersonation', 'https://{environment}/api/openid'], 
  redirectUrl: 'http://localhost:4200/authentication', 
  passwordReset: 'https://{environment}/oauth2/v2.0/authorize?p=B2C_1_PasswordReset'
   };
   

   _access_token: any;
   accessToken: string;
    private app: any;
    public user: any;
    constructor() {     
        this.app = new UserAgentApplication(this.applicationConfig.clientID, this.applicationConfig.authority,
            this.authCallback.bind(this),
            {
              redirectUri: this.applicationConfig.redirectUrl, validateAuthority: false
            });
      
    }
    public login() {      
        let tokenData = '';
        this.app.loginRedirect(this.applicationConfig.b2cScopes).then(data => {tokenData = data; });     
    }

    private authCallback(errorDesc: any, token: any, error: any, tokenType: any) {    
        if (error) {
          if (errorDesc.indexOf('AADB2C90118') > -1){           
            const clientApp = window.msal as UserAgentApplication;
            const  resetPassword =  this.applicationConfig.passwordauthority;         
            this.app = new UserAgentApplication(this.applicationConfig.clientID,resetPassword, null);
            this.app.loginRedirect(this.applicationConfig.b2cScopes);
          }       
        }
      }     

    public getUser() {
        const user = this.app.getUser();
        if (user) {
            return user;
        } else {
            return null;
        }
    }

    public logout() {
        this.app.logout();
    }

    public getToken() {
        return this.app.acquireTokenSilent(this.applicationConfig.b2cScopes)
            .then(accessToken => {
                console.log(accessToken);
                return accessToken;
            }, error => {
                return this.app.acquireTokenPopup(this.applicationConfig.b2cScopes)
                    .then(accessToken => {
                        return accessToken;
                    }, err => {
                        console.error(err);
                    });
            });
    }
}
