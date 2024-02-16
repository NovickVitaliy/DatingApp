import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {getPaginatedResult, getPaginationHeaders} from "./paginationHelper";
import {Message} from "../_models/message";
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {User} from "../_models/user";
import Promise from "$GLOBAL$";
import {BehaviorSubject, take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  baseUrl = environment.apiUrl;
  hubUrl = environment.hubUrl;
  private hubConnection?: HubConnection;
  private messageThreadSource = new BehaviorSubject<Message[]>([]);
  messageThread$ = this.messageThreadSource.asObservable();
  constructor(private httpClient: HttpClient) { }

  createHubConnection(user: User, otherUsername: string){
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + `message?user=${otherUsername}`, {
        accessTokenFactory(): string | Promise<string> {
          return user.token;
        }
      }).withAutomaticReconnect()
      .build()

    this.hubConnection.start().catch(err => console.log(err));

    this.hubConnection.on("ReceiveMessageThread", messages => {
      this.messageThreadSource.next(messages)
    })

    this.hubConnection.on("NewMessage", message => {
      this.messageThread$.pipe(take(1))
        .subscribe({
          next: messages => {
            this.messageThreadSource.next([...messages, message]);
          }
        })
    })
  }

  stopHubConnection(){
    if(this.hubConnection){
      this.hubConnection.stop();
    }
  }

  getMessages(pageNumber: number, pageSize: number, container: string){
    let params = getPaginationHeaders(pageNumber, pageSize);

    params = params.append('Container', container);
    return getPaginatedResult<Message[]>(this.baseUrl + 'messages', params, this.httpClient);
  }

  getMessageThread(username: string){
    return this.httpClient.get<Message[]>(this.baseUrl + `messages/thread/${username}`);
  }

  async sendMessage(username: string, content:string){
    return this.hubConnection?.invoke("SendMessage", {recipientUsername:username, content})
      .catch(error => console.log(error));
  }

  deleteMessage(id: number){
    return this.httpClient.delete(this.baseUrl + 'messages/' + id);
  }
}
