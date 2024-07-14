import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../services/user.service';
import User from '../../types/user';
import { ActivatedRoute, Router } from '@angular/router';
import { QrCodeModule } from 'ng-qrcode';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [MatInput, MatInputModule, MatButtonModule, ReactiveFormsModule, QrCodeModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {

  formBuilder = inject(FormBuilder);
  userForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    age: [''],
    address: [''],
    password: ['', [Validators.required, Validators.minLength(8)]],
    link: ['', [Validators.required]],
    navee: ['']
  });
  userService = inject(UserService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  editUserId!: string;
  ngOnInit() {
    this.editUserId = this.route.snapshot.params['id'];
    if (this.editUserId) {
      this.userService.getUser(this.editUserId).subscribe((result) => {
        this.userForm.patchValue(result);
      });
    }
  }
  addUser() {
    if (this.userForm.invalid) {
      alert('Please provide all field with valid data');
      return;
    }
    const model: User = this.userForm.value;
    this.userService.addUser(model).subscribe(result => {
      alert("User added successfully");
      this.router.navigateByUrl('/');
    })
  }
  updateUser() {
    console.log(this.userForm.value);
    if (this.userForm.invalid) {
      alert('Please provide all field with valid data');
      return;
    }
    const model: User = this.userForm.value;
    this.userService.updateUser(this.editUserId, model).subscribe(result => {
      alert("User updated successfully");
      this.router.navigateByUrl('/');
    })
  }


}
