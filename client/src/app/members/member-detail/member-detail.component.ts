import {Component, importProvidersFrom, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Member} from "../../_models/member";
import {ActivatedRoute, Router} from "@angular/router";
import {MembersService} from "../../_services/members.service";
import {GalleryItem, GalleryModule, ImageItem} from "ng-gallery";
import {MemberMessagesComponent} from "../member-messages/member-messages.component";
import {PresenceService} from "../../_services/presence.service";

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [CommonModule, GalleryModule, MemberMessagesComponent],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.scss'
})
export class MemberDetailComponent implements OnInit {
  member: Member = {} as Member;
  images: GalleryItem[] = [];

  constructor(private membersService: MembersService,
              private activatedRoute: ActivatedRoute,
              public presenceService: PresenceService) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe({
      next: data => this.member = data['member']
    })

    this.activatedRoute.queryParams.subscribe({
      next: params => params['tab'] && this.selectTab(params['tab'])
    })

    this.getImages();
  }

  selectTab(heading: string){
  }

  getImages(){
    if(!this.member) return;
    for(const photo of this.member.photos) {
      this.images.push(new ImageItem({src: photo.url, thumb: photo.url}))
    }
  }
}
