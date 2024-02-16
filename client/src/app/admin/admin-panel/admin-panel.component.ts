import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TabsModule} from "ngx-bootstrap/tabs";
import {HasRoleDirective} from "../../_directives/has-role.directive";
import {UserManagementComponent} from "../user-management/user-management.component";
import {PhotoManagementComponent} from "../photo-management/photo-management.component";

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, TabsModule, HasRoleDirective, UserManagementComponent, PhotoManagementComponent],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent {

}
