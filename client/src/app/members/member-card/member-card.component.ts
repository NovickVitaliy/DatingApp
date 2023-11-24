import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Member} from "../../_models/member";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.scss'
})
export class MemberCardComponent {
  @Input() member: Member | undefined;
  constructor() {
  }
}
