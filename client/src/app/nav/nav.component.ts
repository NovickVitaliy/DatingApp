import {Component, importProvidersFrom, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {AccountService} from "../_services/account.service";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {Observable, of} from "rxjs";
import {User} from "../_models/user";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive, NgOptimizedImage],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {
  model: any = {};
  currentUser$: Observable<User | null> = of(null);
  constructor(private accountService: AccountService,
              private router: Router,
              private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
  }

  login() {
    if (this.model) {
      this.accountService.login(this.model)
        .subscribe({
          next: _ => { this.router.navigateByUrl("/members") }
        });
    }
  }

  public logout(){
    this.accountService.logout();
    this.router.navigateByUrl("/");
  }
}
