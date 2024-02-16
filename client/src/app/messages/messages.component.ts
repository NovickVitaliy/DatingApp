import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Message} from "../_models/message";
import {Pagination} from "../_models/pagination";
import {MessageService} from "../_services/message.service";
import {ButtonsModule} from "ngx-bootstrap/buttons";
import {FormsModule} from "@angular/forms";
import {load} from "@angular-devkit/build-angular/src/utils/server-rendering/esm-in-memory-loader/loader-hooks";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, ButtonsModule, FormsModule, RouterLink],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent implements OnInit{

  messages?: Message[];
  pagination?: Pagination;
  container = 'Unread';
  pageNumber = 1;
  pageSize = 5;
  loading = false;

  constructor(private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(){
    this.loading = true;
    this.messageService.getMessages(this.pageNumber, this.pageSize, this.container)
      .subscribe({
        next: response => {
          this.messages = response.result;
          this.pagination = response.pagination;
          this.loading = false;
        }
      });
  }

  deleteMessage(id: number){
    this.messageService.deleteMessage(id)
        .subscribe({
          next: _ => {
            this.messages?.splice(this.messages?.findIndex(m => m.id === id), 1);
          }
        })
  }

  pageChanged(event: any){
    if(this.pageNumber !== event.page){
      this.pageNumber = event.page;
      this.loadMessages();
    }
  }

}
