import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.development";
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {ToastrService} from "ngx-toastr";
import {User} from "../_models/user";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  hubUrl = environment.hubUrl;
  private hubConnection?: HubConnection;
  private onlineUsersSource = new BehaviorSubject<string[]>([]);
  onlineUsers$ = this.onlineUsersSource.asObservable();
  constructor(private toastr: ToastrService) { }

  createHubConnection(user: User){
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'presence', {
        accessTokenFactory(): string | Promise<string> {
          return user.token;
        }
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch(error => console.log(error));

    this.hubConnection.on('UserIsOnline', username => {
      this.toastr.info(`${username} has connected`);
    })

    this.hubConnection.on('UserIsOffline', username => {
      this.toastr.warning(`${username} has disconnected`);
    })

    this.hubConnection.on('GetOnlineUsers', usernames => {
      this.onlineUsersSource.next(usernames);
    })
  }


  stopHubConnection(){
    this.hubConnection?.stop().catch(err => console.log(err));
  }
}
