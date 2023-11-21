import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-test-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-error.component.html',
  styleUrl: './test-error.component.scss'
})
export class TestErrorComponent {
  baseUrl = "https://localhost:7208/api/";
  validationErrors: string[] = [];

  constructor(private httpClient: HttpClient) {
  }

  get404Error() {
    this.httpClient.get(this.baseUrl + "buggy/not-found").subscribe({
      next: response => console.log(response),
      error: err => console.log(err)
    });
  }

  get400Error() {
    this.httpClient.get(this.baseUrl + "buggy/bad-request").subscribe({
      next: response => console.log(response),
      error: err => console.log(err)
    });
  }

  get500Error() {
    this.httpClient.get(this.baseUrl + "buggy/server-error").subscribe({
      next: response => console.log(response),
      error: err => console.log(err)
    });
  }

  get401Error() {
    this.httpClient.get(this.baseUrl + "buggy/auth").subscribe({
      next: response => console.log(response),
      error: err => console.log(err)
    });
  }

  get400ValidationError() {
    this.httpClient.post(this.baseUrl + "account/register", {}).subscribe({
      next: response => console.log(response),
      error: err => {
        console.log(err);

        this.validationErrors = err;
      }
    });
  }
}
