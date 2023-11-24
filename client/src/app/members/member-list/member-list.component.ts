import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Member} from "../../_models/member";
import {MembersService} from "../../_services/members.service";
import {MemberCardComponent} from "../member-card/member-card.component";

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [CommonModule, MemberCardComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss'
})
export class MemberListComponent implements OnInit{
  members: Member[] = [];

  constructor(private membersService: MembersService) {
  }

  loadMembers(){
    this.membersService.getMembers().subscribe({
      next: res => {
        this.members = res;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  ngOnInit(): void {
    this.loadMembers();
  }
}
