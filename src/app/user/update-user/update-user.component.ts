import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {User} from '../../user/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  statusCode: number;
  requestProcessing = false;
  articleIdToUpdate = null;
  processValidation = false;
  store=null;
  
  mail:string;

  //Create form
  UserUpdateForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),   
    mail: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required), 
    address: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
});
  
  constructor(private userService: UserService) { }



  ngOnInit() {

    var users = JSON.parse(localStorage.getItem('currentUser'));
    this.mail = users.mail;

    console.log(this.mail);
    this.loadUserToEdit(this.mail.toString());

    
  }

  
   loadUserToEdit(mail: string) {
    this.preProcessConfigurations();
    this.userService.getUserByMail(this.mail).subscribe(user => {
              this.articleIdToUpdate = user.idUser; 
              this.store=user.storage;
              console.log(user.mail);  
              this.UserUpdateForm.setValue({ firstName:user.firstName,lastName:user.lastName,mail:user.mail,phone:user.phone,address:user.address,password:user.password});
        this.processValidation = true;
        this.requestProcessing = false;   
     },
      errorCode =>  this.statusCode = errorCode);   
 }
  
    

getUserByMail(mail:string){
 return this.userService.getUserByMail(mail);
}

updateUser(){

  let id_User=this.articleIdToUpdate;
  let firstName = this.UserUpdateForm.get('firstName').value.trim();
  let lastName = this.UserUpdateForm.get('lastName').value.trim();
  let mail = this.UserUpdateForm.get('mail').value.trim();	
  let phone = this.UserUpdateForm.get('phone').value.trim();
  let address = this.UserUpdateForm.get('address').value.trim(); 
  let storage = this.store;
  let password = this.UserUpdateForm.get('password').value.trim(); 

  let user= new User(id_User, firstName, lastName,mail,phone, address, storage, password );
console.log(id_User+firstName+lastName+mail);
this.userService.updateUser(user).subscribe(successCode => {
  this.statusCode = successCode;
},
errorCode => this.statusCode = errorCode); 
}


//Perform preliminary processing configurations
 preProcessConfigurations() {
  this.statusCode = null;
this.requestProcessing = true;   
}
//Go back from update to create
backToCreateArticle() {
  this.articleIdToUpdate = null;
  this.UserUpdateForm.reset();	  
this.processValidation = false;
}
  
}

 
