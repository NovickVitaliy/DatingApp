import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment.development";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Member} from "../_models/member";
import {map, Observable, of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MembersService {
    baseUrl: string = environment.apiUrl;
    members: Member[] = [];

    constructor(private httpClient: HttpClient) {
    }

    getMembers(): Observable<Member[]> {
        if (this.members.length > 0) {
            return of(this.members);
        }
        return this.httpClient.get<Member[]>(this.baseUrl + 'users')
            .pipe(
                map(members => {
                    this.members = members;
                    return members;
                }));
    }

    getMember(username: string) {
        const member = this.members.find(x => x.userName === username);
        if (member) {
            return of(member);
        }
        return this.httpClient.get<Member>(this.baseUrl + "users/" + username);
    }

    updateMember(member: Member) {
        return this.httpClient.put(this.baseUrl + 'users', member).pipe(
            map(() => {
              const index = this.members.indexOf(member);
              this.members[index] = {...this.members[index], ...member}
            })
        );
    }
}
