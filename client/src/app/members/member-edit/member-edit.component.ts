import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {CommonModule, NgFor} from '@angular/common';
import {Member} from "../../_models/member";
import {User} from "../../_models/user";
import {AccountService} from "../../_services/account.service";
import {MembersService} from "../../_services/members.service";
import {take} from "rxjs";
import {load} from "@angular-devkit/build-angular/src/utils/server-rendering/esm-in-memory-loader/loader-hooks";
import {GalleryComponent} from "ng-gallery";
import {FormsModule, NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {PhotoEditorComponent} from "../photo-editor/photo-editor.component";

@Component({
    selector: 'app-member-edit',
    standalone: true,
    imports: [CommonModule, GalleryComponent, FormsModule, PhotoEditorComponent],
    templateUrl: './member-edit.component.html',
    styleUrl: './member-edit.component.scss'
})
export class MemberEditComponent implements OnInit {
    @ViewChild('editForm') editForm: NgForm | undefined;

    @HostListener('window:beforeunload', ['$event']) unloadNotitication($event: any) {
        if (this.editForm?.dirty) {
            $event.returnValue = true;
        }
    }

    member: Member | undefined;
    user: User | null = null;

    constructor(private accountService: AccountService,
                private memberService: MembersService,
                private toastr: ToastrService) {
        this.accountService.currentUser$.pipe(take(1)).subscribe({
            next: user => this.user = user
        });
    }

    ngOnInit(): void {
        this.loadMember();
    }

    loadMember() {
        if (!this.user) return;
        this.memberService.getMember(this.user.username).subscribe({
            next: member => this.member = member
        })
    }

    updateMember() {
        this.memberService.updateMember(this.editForm?.value).subscribe({
            next: _ => {
                this.toastr.success("Profile updated successfully")
                this.editForm?.reset(this.member);
            }
        });
    }
}
