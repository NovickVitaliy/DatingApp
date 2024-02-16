import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Message} from "../../_models/message";
import {MessageService} from "../../_services/message.service";
import {FormsModule, NgForm} from "@angular/forms";

@Component({
  selector: 'app-member-messages',
  standalone: true,
    imports: [CommonModule, FormsModule],
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.scss'
})
export class MemberMessagesComponent implements OnInit {
  @Input() username?: string;
  @ViewChild('messageForm') messageForm?: NgForm;
  messageContent = '';

  constructor(public messageService: MessageService) {
  }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    if (this.username) {
      this.messageService.getMessageThread(this.username)
        .subscribe({
          next: response => {
            // this.messages = response;
          }
        })
    }
  }

  sendMessage(){
    if(this.username){
      this.messageService.sendMessage(this.username, this.messageContent)
        .then(() => {
          this.messageForm?.reset();
        })
    }
    return;
  }
}
