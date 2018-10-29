import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule,HttpClient } from '@angular/common/http'; 
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { routing }        from './app.rooting';
import { SocialLoginModule, AuthServiceConfig,GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";

import { DragAndDropModule } from 'angular-draggable-droppable';
import { DndModule } from 'ng2-dnd';
import { ngfModule, ngf } from "angular-file";
import {NgForm} from '@angular/forms';




import { AppComponent }  from './app.component';
import { FileComponent }  from './file/file.component';
import { FileService } from './services/file/file.service';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { UserService } from './services/user/user.service';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './userSpace/home.component';
import { AuthGuard } from './user/login/_guards/auth.guard';
import {  UserServiceL } from './user/login/_services/user.service';
import { AuthenticationService } from './user/login/_services/authentication.service';
import { SocialLoginComponent } from './user/social-login/social-login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AddFileComponent } from './file/add-file/add-file.component';



let config = new AuthServiceConfig([
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('624796833023-clhjgupm0pu6vgga7k5i5bsfp6qp6egh.apps.googleusercontent.com')
      },
     
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('561602290896109')
      }
      
    ]);


@NgModule({
  imports: [  
      
        BrowserModule,
            HttpModule,
            HttpClientModule,
            BrowserModule,
            FormsModule,
            HttpModule,
            BrowserModule,
            ngfModule,
            BrowserModule,
            HttpClientModule,
            FormsModule,
            routing,
            SocialLoginModule.initialize(config),
            DragAndDropModule.forRoot(),
            DndModule.forRoot(),
		ReactiveFormsModule
  ],
  declarations: [
        AppComponent,
		FileComponent,
		CreateUserComponent,
		UpdateUserComponent,
		LoginComponent,
            HomeComponent,
		SocialLoginComponent,
		WelcomeComponent,
		AddFileComponent,
		
  ],
  providers: [
        FileService,
        AuthGuard,
        AuthenticationService,
        UserServiceL,
        UserService
  ],
  bootstrap: [
        AppComponent
  ]
})
export class AppModule { }
