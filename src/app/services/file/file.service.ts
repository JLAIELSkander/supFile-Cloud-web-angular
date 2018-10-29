import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { File } from '../file';

@Injectable()
export class FileService {
    //URLs for CRUD operations
	allfilesUrl = "http://localhost:8080/files/all";
	fileUrl = "http://localhost:8080/files/file";
	url : String = "http://localhost:3000/";
	//Create constructor to get Http instance
	constructor(private http:Http,private https: HttpClient) { 
	}

	
    getAllItem(path) : Observable<any> {
        return this.https.get(this.url + "getfiles?path=" + path);
    }


    deleteItem(path) : Observable<any> {
        return this.https.get(this.url + "deletefile?path=" + path);
    }

    downloadFile(path) : Observable<any> {
        return this.https.get(this.url + "download?path=" + path, {responseType: 'arraybuffer'});
    }
  
	
	//Fetch all articles
    getAllFiles(): Observable<File[]> {
        return this.http.get(this.allfilesUrl)
		   		.map(this.extractData)
		        .catch(this.handleError);

	}
	getFilesByMail(mail:string):Observable<File[]> {
		const url = `${this.allfilesUrl}/${mail}/`;
		return this.http.get(url).map(this.extractData)
		.catch(this.handleError);
		
	}


	delete(file_id: string): Observable<Boolean> {
		const url = `${this.fileUrl}/${file_id}`;
		return this.http.delete(url).map(this.extractData)
		.catch(this.handleError);
	  }

	

	//Create article
    createArticle(file: File):Observable<number> {
	    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.fileUrl, file, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
	//Fetch article by id
    getArticleById(articleId: string): Observable<File> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let cpParams = new URLSearchParams();
		cpParams.set('id', articleId);			
		let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
		return this.http.get(this.fileUrl, options)
			   .map(this.extractData)
			   .catch(this.handleError);
    }	
	//Update article
    updateArticle(file: File):Observable<number> {
	    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.fileUrl, file, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
  		
	private extractData(res: Response) {
	    let body = res.json();
        return body;
    }
    private handleError (error: Response | any) {
		console.error(error.message || error);
		return Observable.throw(error.status);
    }
}