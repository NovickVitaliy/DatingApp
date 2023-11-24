import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
import {User} from "../_models/user";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl: string = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private httpClient: HttpClient) { }

  public login(model: any): Observable<any>{
    return this.httpClient.post<User>(this.baseUrl + "account/login", model).pipe(
      map((response: User) => {
        const user = response;
        if(user){
          localStorage.setItem("user", JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  public register(model: any){
    return this.httpClient.post<User>(this.baseUrl + "account/register", model).pipe(
      map(user => {
        if(user){
          localStorage.setItem("user", JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  setCurrentUser(user: User){
    this.currentUserSource.next(user);
  }

  public logout(){
    localStorage.removeItem("user");
    this.currentUserSource.next(null);
  }


}
