import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../user/login/_services/authentication.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  myFile = true;
  addFile = false;
  profile = false;
  recent = false;
  shared = false;

   mail = String; 
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) { }
  ngOnInit() {

    var users = JSON.parse(localStorage.getItem('currentUser'));
      this.mail = users.mail
    ;
  }

  public logout(){

    this.authenticationService.logout();
    this.router.navigate(['/welcome']);
    console.log("desconected");

}

public addF(){

this.addFile=true;
this.myFile=false;
this.profile=false;

}

public myF(){

this.myFile=true;
this.addFile=false;
this.profile=false;


 
}

public myProfile(){

  this.myFile=false;
  this.addFile=false;
  this.profile=true;


  
   
  }

}
