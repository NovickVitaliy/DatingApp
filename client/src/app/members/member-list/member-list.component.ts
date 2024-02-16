import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Member} from "../../_models/member";
import {MembersService} from "../../_services/members.service";
import {MemberCardComponent} from "../member-card/member-card.component";
import {Observable, take} from "rxjs";
import {Pagination} from "../../_models/pagination";
import {UserParams} from "../../_models/userParams";
import {User} from "../../_models/user";
import {AccountService} from "../../_services/account.service";
import {FormsModule} from "@angular/forms";
import {ButtonsModule} from "ngx-bootstrap/buttons";

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [CommonModule, MemberCardComponent, FormsModule, ButtonsModule],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss'
})
export class MemberListComponent implements OnInit{
  // members$: Observable<Member[]> | undefined;
  pagination: Pagination | undefined;
  members: Member[] = [];
  userParams: UserParams | undefined;
  user: User | undefined;
  genderList = [{value:'male', display:'Males'},
    {value: 'female', display: 'females'}]
  constructor(private membersService: MembersService) {
    this.userParams = this.membersService.getUserParams();
  }


  ngOnInit(): void {
    // this.members$ = this.membersService.getMembers();
    this.loadMembers();
  }

  loadMembers(){
    if(this.userParams) {
      this.membersService.setUserParams(this.userParams)
      this.membersService.getMembers(this.userParams)
        .subscribe({
          next: response => {
            if(response.result && response.pagination){
              this.members = response.result;
              this.pagination = response.pagination;
            }
          }
        })
    }

  }

  resetFilters(){
    if(this.user){
      this.membersService.resetUserParams();
      this.loadMembers();
    }
  }
}
