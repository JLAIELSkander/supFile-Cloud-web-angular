import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map'

import { URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
 
@Injectable()
export class AuthenticationService {
    public token: Boolean;
    loginUrl = "http://localhost:8080/users/login/";

    constructor(private http: Http,  private https: HttpClient,private router: Router
    ) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
       }

   

login2(mail,password:string): Observable<Boolean> {
    const url = `${this.loginUrl}/${mail}/${password}`;
    return this.https.get<Boolean>(url).map((response: any) => {
        let token = response;
        console.log(token);
        if (token==true) {
            // set token property
            this.token = token;

            // store username and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify({ mail: mail, token: token }));
            console.log(token+mail);
            // return true to indicate successful login
            return true;
           
        } else {
            // return false to indicate failed login
            console.log('pas auth');

            return false;
        }
    });
}
      

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
      
          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead
      
          // TODO: better job of transforming error for user consumption
          this.log(`${operation} failed: ${error.message}`);
      
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
      }

      private log(message: string) {
        console.log(message);
      }
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
       
        
    }
}