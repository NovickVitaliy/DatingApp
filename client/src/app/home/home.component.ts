import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from "../register/register.component";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  registerMode = false;
  users: any;
  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  registerToggle(){
    this.registerMode = !this.registerMode;
  }

  getUsers() {
    this.httpClient.get("httpS://localhost:7208/api/users")
      .subscribe({
        next: response => {
          this.users = response;
          console.log(this.users)
        },
        error: err => console.log(err)
      });
  }

  cancelRegisterMode(event: boolean){
    this.registerMode = event;
  }

}
