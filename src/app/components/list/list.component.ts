import { Component, OnInit } from '@angular/core';
import { UserTypes } from 'src/app/core/constants/userType';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public userList: User[] = [];

  constructor(private readonly userService: UserService) {}

  public ngOnInit() {
    this.userService.openedUserForm$.subscribe(res => {
      if (!res) {

        this.loadUsers();
      }
    })
  }

  public openUserForm(user?: User) {
    user = user ? user : this.getEmptyUser();
    this.userService.openedUserForm$.next(user);
  }

  public loadUsers(): void {
    this.userService.getUsers().subscribe(res => {
      this.userList = res;
      console.log(this.userList);
    });
  }

  getEmptyUser(): User {
    return {
      id: 0,
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      userType: UserTypes.admin
    }
  }
}
