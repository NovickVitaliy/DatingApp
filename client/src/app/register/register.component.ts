import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {AccountService} from "../_services/account.service";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  model: any = {};
  @Output() cancelRegister = new EventEmitter();

  constructor(private accountService: AccountService) {
  }

  ngOnInit(): void {
  }

  register(){
    this.accountService.register(this.model)
      .subscribe({
        next: () => {
          this.cancel()
        },
        error: error => {
          console.log(error);
        },
        complete: () => { }
      })
  }

  cancel(){
    this.cancelRegister.emit(false)
    console.log("cancelled");
  }
}
