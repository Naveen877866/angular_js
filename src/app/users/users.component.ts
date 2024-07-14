import { Component, inject, Output, EventEmitter } from '@angular/core';
import User from '../types/user';
import { UserService } from '../services/user.service';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { QrCodeModule } from 'ng-qrcode';



@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatButtonModule, RouterLink, QrCodeModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users: User[] = [];
  userService = inject(UserService);
  qr_id = "";


  ngOnInit() {
    this.userService.getUsers().subscribe((result) => {
      this.users = result;
      console.log(this.users);
    })
  }
  delete(id: string) {
    const ok = confirm('Are you sure want to delete user?')
    if (ok) {
      this.userService.deleteUser(id).subscribe((result) => {
        alert('User delete successfully');
        this.users = this.users.filter((u) => u._id != id)
      })
    }
  }
  @Output() dataEvent = new EventEmitter<string>();
  openPopup(link: string): void {
    this.userService.openDialog();
    this.userService.updateData(link);
  }
}
;

