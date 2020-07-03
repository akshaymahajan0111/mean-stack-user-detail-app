import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { NgForm } from "@angular/forms";
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [UserService]
})


export class SignUpComponent implements OnInit {
  ngOnInit() {
  }

  constructor(private userService: UserService) { }

  showSucessMessage: boolean;
  serverErrorMessages: string;
  url: any = '';
  filename = '';

  onSubmit(form: NgForm) {
    this.userService.postUser(form.value).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(form);
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

  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      fullName: '',
      mobile: '',
      email: '',
      password: '',
      profilePicture: ''
    };
    this.url = '';
    this.filename = '';
    form.resetForm();
    this.serverErrorMessages = '';
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.filename = event.target.files[0].name;

      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.url = reader.result;
      }
    }
  }
  public delete() {
    this.url = '';
  }
}

