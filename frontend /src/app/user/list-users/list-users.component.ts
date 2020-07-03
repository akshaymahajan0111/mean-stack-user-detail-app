import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
  providers: [UserService]
})
export class ListUsersComponent implements OnInit {

  constructor(private userService: UserService) { }

  tableHeaders = ['Name', 'Email',]
  serverErrorMessages: string;
  userList: any = [];


  ngOnInit() {
    this.userService.getUsers().subscribe(
      res => {
        console.log('res:', res);
        Object.keys(res).forEach((user) => {
          this.userList.push((res[user]));
        })
        console.log(this.userList, this.userList.length)
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        } else {
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
        }
      }
    );
  }

  cellData(rowData, columnKey) {
    switch (columnKey) {
      case 'Name':
        return rowData['fullName'];
      case 'Email':
        return rowData['email'];
    }
  }
}
