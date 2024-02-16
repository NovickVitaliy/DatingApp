import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Member} from "../_models/member";
import {MembersService} from "../_services/members.service";
import {ButtonsModule} from "ngx-bootstrap/buttons";
import {FormsModule} from "@angular/forms";
import {MemberCardComponent} from "../members/member-card/member-card.component";
import {Pagination} from "../_models/pagination";

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [CommonModule, ButtonsModule, FormsModule, MemberCardComponent],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.scss'
})
export class ListsComponent implements OnInit{
  members: Member[] | undefined;
  predicate = 'liked';
  pageNumber = 1;
  pageSize = 5;
  pagination: Pagination | undefined;

  constructor(private membersService: MembersService) {
  }

  loadLikes(){
    this.membersService.getLikes(this.predicate, this.pageNumber, this.pageSize)
      .subscribe({
        next: response => {
          this.members = response.result;
          this.pagination = response.pagination;
        }
      })
  }

  ngOnInit(): void {
    this.loadLikes();
  }

  pageChanged(event: any){
    if(this.pageNumber !== event.page){
      this.pageNumber = event.page;
      this.loadLikes();
    }
  }
}
