import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.css']
})
export class AddFileComponent  {

  filesToUpload: Array<File> = [];
  progress : Boolean = false;
  alert = {show : false,color : "", message : ""}

  constructor(public http : HttpClient) {}

  upload() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;

    for(let i =0; i < files.length; i++){
        formData.append("uploads[]", files[i], files[i]['name']);
    }
    this.progress = true;

    this.http.post('http://localhost:3000/uploadfiles', formData)
        .subscribe((val) => {
          this.progress = false;

          if(val == true) {
            this.alert.show = true;
            this.alert.message = "File(s) upload with success !";
            this.alert.color = "alert-success";
            this.filesToUpload = [];
          } else {
            this.alert.show = true;
            this.alert.message = "Oups !!!";
            this.alert.color = "alert-danger";
          }
          
        })
        
  }

  Delete(position) {
    this.filesToUpload.splice(position,1)
  }

  AllowDrop(event) {
    event.preventDefault();
    console.log("allow drop")
  }

  fileChangeEvent(event: any,drop:string) {
    
    var myArray;
    event.preventDefault();
    event.stopPropagation();

    if(drop) {
      console.log("drop exist")
      myArray = <Array<File>> event.dataTransfer.files;
    } else {
      console.log("drop !exist")
      myArray = <Array<File>> event.target.files;
    }

    if(myArray) {
      for(var i = 0; i < myArray.length; i++) {
        this.filesToUpload.push(myArray[i]);
      }
    }
    

  }

  ResetFile() {
    this.filesToUpload = [];
  }

}
