import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.development";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Member} from "../_models/member";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl: string = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  getMembers(): Observable<Member[]> {
    return this.httpClient.get<Member[]>(this.baseUrl + 'users');
  }

  getMember(username: string){
    return this.httpClient.get<Member>(this.baseUrl + "users/" + username);
  }

}
