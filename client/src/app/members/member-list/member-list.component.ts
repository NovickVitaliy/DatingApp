import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Member} from "../../_models/member";
import {MembersService} from "../../_services/members.service";
import {MemberCardComponent} from "../member-card/member-card.component";
import {Observable} from "rxjs";

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [CommonModule, MemberCardComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss'
})
export class MemberListComponent implements OnInit{
  members$: Observable<Member[]> | undefined;

  constructor(private membersService: MembersService) {
  }


  ngOnInit(): void {
    this.members$ = this.membersService.getMembers();
  }
}
