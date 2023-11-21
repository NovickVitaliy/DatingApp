import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {AccountService} from "../_services/account.service";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {ToastrService} from "ngx-toastr";

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

  constructor(private accountService: AccountService,
              private toastr: ToastrService) {
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
          let errors = error.error.errors;
          for (let errorKey in errors) {
            this.toastr.error(errors[errorKey]);
          }
        },
        complete: () => { }
      })
  }

  cancel(){
    this.cancelRegister.emit(false)
    console.log("cancelled");
  }
}
