import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Member} from "../../_models/member";
import {RouterLink} from "@angular/router";
import {MembersService} from "../../_services/members.service";
import {ToastrService} from "ngx-toastr";
import {PresenceService} from "../../_services/presence.service";

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.scss'
})
export class MemberCardComponent {
  @Input() member: Member | undefined;
  constructor(private memberService: MembersService,
              private toastr: ToastrService,
              public presenceService: PresenceService) {
  }

  addLike(member: Member){
    this.memberService.addLike(member.userName)
      .subscribe({
        next: () => this.toastr.success(`You have liked ${member.knownAs}`)
      })
  }
}
