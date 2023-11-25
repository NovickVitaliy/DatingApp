import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {NavComponent} from "./nav/nav.component";
import {AccountService} from "./_services/account.service";
import {User} from "./_models/user";
import {HomeComponent} from "./home/home.component";
import {NgxSpinnerModule} from "ngx-spinner";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavComponent, HomeComponent, NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title: string = 'Dating app';
  users: any;

  constructor(private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.setCurrentUser();
  }


  setCurrentUser() {
    const userString = localStorage.getItem("user");
    console.log("setCurrentUser(): userString=" + userString)
    if (!userString) return;
    const user: User = JSON.parse(userString);
    console.log("setCurrentUser(): " + user)
    this.accountService.setCurrentUser(user);
  }
}
