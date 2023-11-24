import {Component, importProvidersFrom, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Member} from "../../_models/member";
import {ActivatedRoute, Router} from "@angular/router";
import {MembersService} from "../../_services/members.service";
import {GalleryItem, GalleryModule, ImageItem} from "ng-gallery";

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [CommonModule, GalleryModule],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.scss'
})
export class MemberDetailComponent implements OnInit {
  member: Member | undefined;
  images: GalleryItem[] = [];

  constructor(private membersService: MembersService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    let username = this.activatedRoute.snapshot.paramMap.get('username');
    if (!username) return;
    this.membersService.getMember(username).subscribe({
      next: member => {
        this.member = member;
        this.getImages();
      }
    });
  }

  getImages(){
    if(!this.member) return;
    for(const photo of this.member.photos) {
      this.images.push(new ImageItem({src: photo.url, thumb: photo.url}))
    }
  }
}
