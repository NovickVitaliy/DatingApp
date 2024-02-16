import {Component, importProvidersFrom, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {AccountService} from "../_services/account.service";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {map, Observable, of, take} from "rxjs";
import {User} from "../_models/user";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {MembersService} from "../_services/members.service";
import {UserParams} from "../_models/userParams";
import {HasRoleDirective} from "../_directives/has-role.directive";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive, NgOptimizedImage, HasRoleDirective],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {
  model: any = {};
  currentUser$: Observable<User | null> = of(null);

  constructor(private accountService: AccountService,
              private router: Router,
              private toastr: ToastrService,
              private memberService: MembersService) {

  }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
  }

  login() {
    if (this.model) {
      this.accountService.login(this.model)
        .subscribe({
          next: _ => {
            this.router.navigateByUrl("/members");
          }
        });
    }
  }

  public logout() {
    this.accountService.logout();
    this.router.navigateByUrl("/");
  }
}
