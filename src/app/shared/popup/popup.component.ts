import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
 public message = '';
 public color = '';

 constructor(private readonly userService: UserService) {}

 public hideMessage(): void {
  this.resetVariable();
 }

 public get IsShowMessage(): boolean {
  return !!(this.message && this.color);
 }

 public ngOnInit() {
  this.resetVariable();
  this.userService.showedMessage$.subscribe(res => {
    this.message = res[0];
    this.color = res[1];
    setTimeout(() => {
      this.resetVariable();
    }, 3000);
  });
 }

 private resetVariable(): void {
  this.message = '';
  this.color = '';
 }

}
