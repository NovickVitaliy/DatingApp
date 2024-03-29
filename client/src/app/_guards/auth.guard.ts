import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {AccountService} from "../_services/account.service";
import {ToastrService} from "ngx-toastr";
import {main} from "@angular/compiler-cli/src/main";
import {map} from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const toastr = inject(ToastrService);

  return accountService.currentUser$.pipe(map(
    user => {
      if(user){
        return true;
      } else {
        toastr.error("You shall not pass!");
        return false;
      }
    }
  ));
};
