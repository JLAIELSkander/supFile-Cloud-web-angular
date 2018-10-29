import { Component, OnInit } from '@angular/core';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { Router } from '@angular/router';

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.css']
})
export class SocialLoginComponent implements OnInit {
  private user: {};
  public token: Boolean;
  private loggedIn: boolean;
 constructor(private router: Router,private authService: AuthService) { }
 ngOnInit() {
 
  }

  signInWithGoogle(): void {
    this.authService.signOut();
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      localStorage.setItem('currentUser', JSON.stringify({ mail: user.email, token: true }));
    });

  }

  signInWithFB(): void {
// this.authService.signOut();
   this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user) => {
      this.user = user;
     this.loggedIn = (user != null);
    localStorage.setItem('currentUser', JSON.stringify({ mail: user.email, token: true }));
    });
  }

  back(): void {
   // this.authService.signOut();
    localStorage.removeItem('currentUser');
}

  SignIn(): void {
          this.router.navigate(['/home']);
}
}

