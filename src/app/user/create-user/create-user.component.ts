import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {User} from '../user';

import {UserService} from '../../services/user/user.service';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {


  statusCode: number;
   requestProcessing = false;
   articleIdToUpdate = null;
   processValidation = false;
   mail:string;
   path:string="C:/Users/SKANDER/Documents/supfile";



  //Create form
  userForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    mail: new FormControl(),
    phone: new FormControl(),
    address: new FormControl(),
    password: new FormControl(),
    storage: new FormControl()
   
});

  constructor(private userService: UserService) { }

ngOnInit() {
  }



suscribeUser(){

  let firstName = this.userForm.get('firstName').value.trim();
  let lastName = this.userForm.get('lastName').value.trim();
  let mail = this.userForm.get('mail').value.trim();	
  let phone = this.userForm.get('phone').value.trim();
  let address = this.userForm.get('address').value.trim(); 
  let storage = 80; 
  let password = this.userForm.get('password').value.trim(); 

  let user= new User(null, firstName, lastName,mail,phone, address, storage, password );

    this.userService.createUser(user).subscribe(user => {
      console.log("user added component");
    });

  } 

  createFolder(){
    this.mail="test";
    return this.userService.createFolderModel(this.path,this.mail);


  }

  onUserFormSubmit() {
	  this.processValidation = true;   
	  if (this.userForm.invalid) {
	       return; //Validation failed, exit from method.
    }   
  }
    preProcessConfigurations() {
      this.statusCode = null;
	  this.requestProcessing = true;   
   }
   //Go back from update to create
   backToCreateUser() {
      this.userForm.reset();	  
	  this.processValidation = false;
   }
  }

  