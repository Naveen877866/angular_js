import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QrCodeModule } from 'ng-qrcode';
import { UsersComponent } from '../users/users.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [QrCodeModule, UsersComponent],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {

  value = "";

  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    private dataService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  receivedData: string | undefined;
  ngOnInit() {
    this.dataService.data$.subscribe(data => {
      this.receivedData = data;
      const nav = this.receivedData;
      if (nav != "") {
        this.value = nav;
      } else {
        this.value = "www.wwe";
      }

    });
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
