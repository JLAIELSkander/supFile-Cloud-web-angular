import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {User} from '../../user/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
 
 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

    //URLs for CRUD operations
  allUsersUrl = "http://localhost:8080/users/all";
  userUrl = "http://localhost:8080/users/user";
  loginUrl = "http://localhost:8080/users/login";
  usermUrl = "http://localhost:8080/users/userm";
  createFolder = "http://localhost:3000/createfolder";
  path ="C:\Users\SKANDER\Documents\supfile";

  logg = false;

  	//Create constructor to get Http instance
	constructor(private http:Http, private https: HttpClient) { 
  }
  
  createUser (user: User): Observable<User> {
    return this.https.post<User>(this.userUrl, user, httpOptions).pipe(
      tap((user: User) => this.log(`added user service`)),
      catchError(this.handleError<User>('eroor service'))


    );

  }

  createFolderModel(path, mail:string){
    const url = `${this.createFolder}/${path}/${mail}`;
    return this.https.get(url).pipe(
      tap((mail: string) => this.log(`added folder service`)),
      catchError(this.handleError('eroor service')))
  }


login(mail,password:string): Observable<Boolean> {
  const url = `${this.loginUrl}/${mail}/${password}`;
  return this.https.get<Boolean>(url).pipe(
    tap(_ => this.log(`fetched hero `)),
    catchError(this.handleError<Boolean>(`getHero `))
  );
}

getUserByMail(mail:string): Observable<User> {
  const url = `${this.usermUrl}/${mail}/`;
  return this.https.get<User>(url).pipe(
    tap(_ => this.log(`fetched hero `)),
    catchError(this.handleError<User>(`getHero `))
  );
}

//Update User
updateUser(user: User): Observable<any> {
  return this.https.put(this.userUrl, user, httpOptions).pipe(
    tap(_ => this.log(`updated hero`)),
    catchError(this.handleError<any>('updateHero'))
  );
}


/*

  private handleError (error: Response | any) {
		console.error(error.message || error);
		return Observable.throw(error.status);
    }
 

  private extractData(res: Response) {
    let body = res.json();
      return body;
  }
  */

//Fetch user by id
/*

  getUserById<Data>(id: number): Observable<User> {
    const url = `${this.userUrl}/?id=${id}`;
    return this.http.get<User[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} User id=${id}`);
        }),
        catchError(this.handleError<User>(`User id=${id}`))
      );
  }
*/
/*

*/
   /** DELETE user*/
   /*
   deleteUser (user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user.idUser;
    const url = `${this.userUrl}/${id}`;
 

    return this.http.delete<User>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted user id=${id}`)),
      catchError(this.handleError<User>('delete user'))
    );
  }


getAllUsers(): Observable<User[]> {
  return this.http.get(this.allUsersUrl)
     .map(this.extractData)
      .catch(this.handleError);

}
 private log(message: string) {
    console.log(message);
  }

 */

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
}
 
  
