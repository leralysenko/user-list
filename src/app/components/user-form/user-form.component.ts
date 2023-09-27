import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter } from 'rxjs';
import { UserTypes} from 'src/app/core/constants/userType';
import { User } from 'src/app/core/models/user';
import { confirmPasswordValidator } from 'src/app/core/validators/password.validator';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  public userForm!: FormGroup;
  public userTypes = UserTypes;
  public user: User | null = null;
  constructor(private readonly fb: FormBuilder,
    private readonly userService: UserService) {}

  public onSubmit(): void {
    this.userForm.markAllAsTouched();
    if (this.userForm.invalid || !this.IsConfirmationPasswordValid) {
      return;
    }
    const userRowValue = this.userForm.getRawValue();
      if(this.user?.id) {
        userRowValue.id = this.user.id;
        this.updateUser(userRowValue);
      } else {
        this.addUser(userRowValue);
      }
  }

  public ngOnInit(): void {
    this.userService.openedUserForm$
      .subscribe(res => {
        this.user = res;
        this.initForm();
      });
  }

  public closeForm() {
    this.userService.openedUserForm$.next(null);
  }

  public deleteUser(): void {
    this.userService.deleteUser(this.user?.id as number)
      .subscribe(() => {});
  }

  public addUser(newUser: User): void {
    this.userService.addUser(newUser)
      .subscribe(() => {});
  }

  public updateUser(updatedUser: User): void {
    this.userService.updateUser(updatedUser)
    .subscribe(() => {});
  }

  public get IsConfirmationPasswordValid(): boolean {
    return this.userForm.get('password')?.value === this.userForm.get('repeatedPassword')?.value;
  }

  public checkValidation(formControlName: string): boolean | undefined{
    return this.userForm.get(formControlName)?.invalid && (this.userForm.get(formControlName)?.dirty || this.userForm.get(formControlName)?.touched);
  }

  private initForm(): void {
    this.userForm = this.fb.group({
      userName: [this.user?.userName || '', Validators.required],
      firstName: [this.user?.firstName || '', Validators.required],
      lastName: [this.user?.lastName || '', Validators.required],
      email: [this.user?.email || '', [Validators.required, Validators.email]],
      password: [this.user?.password || '', 
      [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)]],
      repeatedPassword: [this.user?.password || '', Validators.required],
      userType: [this.user?.userType || '', Validators.required]
    },
    {validator: confirmPasswordValidator('password', 'repeatedPassword')} )
  }
}
