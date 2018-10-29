import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FileService } from '../services/file/file.service';
import { File } from '../services/file';
import { DragDropData } from 'ng2-dnd';


@Component({
   selector: 'app-my-files',
   templateUrl: './file.component.html',
   styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit { 
   //Component properties
   allFiless: File[];
   allFilesMail: File[];
   statusCode: number;
   allFiles = [];
   mail=String;
   url= "C:/Users/SKANDER/Documents/supfile/";
   path:String;
   surPath = "";

 
   constructor(private fileService: FileService) {
   }

   ngOnInit(): void {
    //this.getFilesByMail();
    var users = JSON.parse(localStorage.getItem('currentUser'));
    this.mail = users.mail;
    this.path = this.url.concat(users.mail);
    console.log(this.path);
    this.getAllFiles(this.path);
    

  ;

    
   }   
   getAllFiles(path) {
    this.fileService.getAllItem(path)
      .subscribe((items) => {
        this.allFiles = items;
      })
  }

  getIcon(type) {
    if(type == "Directory") {
      return "glyphicon-folder-open";
    }
    return "glyphicon-file";
  }


  openFolder(file) {
    if(file.type == "Directory") {
      this.surPath +=  "/" + file.name;
      this.getAllFiles(file.path);
    }
  }

  Delete(file) {
    // bootbox.confim({
    //   message: `Do yo want to remove "${file.name}"`,
    //   buttons: {
    //       confirm: {
    //           label: 'Yes',
    //           className: 'btn-success'
    //       },
    //       cancel: {
    //           label: 'No',
    //           className: 'btn-danger'
    //       }
    //   },
    //   callback: function (result) {
    //     console.log('This was logged in the callback: ' + result);
        this.fileService.deleteItem(file.path)
        .subscribe((item) => {
          if(item == true) {
            this.getAllFiles(this.path);
          }
        })
    //   }
    // })

  }

  downloadFile(file) {
    console.log("download");
    this.fileService.downloadFile(file.path)
      .subscribe((el) => {
        console.log(el)
      })
  }


  goBack() {
    var x = this.surPath.split("/");
    this.surPath = "";
    if(x.length > 0) {
      for(var i = 0; i < x.length - 1; i++) {
        this.surPath += "/" + x[i];
      }
      this.getAllFiles(this.path + this.surPath);
    }
  }


  moveFile(event,data) {
    console.log(event)
  }


}



   /*
   //Fetch all files
   getAllFiles() {
        this.fileService.getAllFiles()
		  .subscribe(
                data => this.allFiles = data,
                errorCode =>  this.statusCode = errorCode);   
   }

    //Fetch all files by mail
    getFilesByMail() {
      var users = JSON.parse(localStorage.getItem('currentUser'));
      this.fileService.getFilesByMail(users.mail)
    .subscribe(
              data => this.allFilesMail = data,
              errorCode =>  this.statusCode = errorCode); 
  } 
   //Delete article
   deleteFile(file_id: string) {
      this.fileService.delete(file_id)
	      .subscribe(successCode => {
		            this.statusCode = 1;
				    this.getAllFiles();	
			    },
		        errorCode => this.statusCode = errorCode);    
   }
   
}
    
*/