import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import User from '../types/user';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = "http://localhost:3000";
  httpClient = inject(HttpClient);
  constructor(private dialog: MatDialog) { }
  openDialog(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '250px', // Set the width of the dialog
    });

    // Handle dialog closing (if needed)
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle any actions after the dialog is closed
    });
  }

  private dataSubject = new BehaviorSubject<string>('Initial data');
  data$ = this.dataSubject.asObservable();

  updateData(newData: string) {
    this.dataSubject.next(newData);
  }

  getUsers() {
    return this.httpClient.get<User[]>(this.apiUrl + '/users1');
  }
  getUser(id: string) {
    return this.httpClient.get<User>(this.apiUrl + '/users1/' + id);
  }
  addUser(model: User) {
    return this.httpClient.post(this.apiUrl + '/users', model);
  }
  updateUser(id: string, model: User) {
    return this.httpClient.put(this.apiUrl + '/users1/' + id, model);
  }
  deleteUser(id: string) {
    return this.httpClient.delete(this.apiUrl + '/users1/' + id);
  }


}
