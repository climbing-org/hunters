import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/user.service';
import User from '../../classes/user';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit, AfterViewInit {

    @Input() myProfile = false;

    @ViewChild('inputFile') inputFile: ElementRef;

    form: FormGroup;
    user: User;
    id: number;

    // file
    file: File;
    loading = false;

    showerror = false;

    showNewPasswordInput = false;
    newPassword: string;
    oldPassword: string;
    showNewPasswordSuccess = false;
    showNewPasswordFailure = false;
    newPasswordFailureMessage: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private uploadService: UploadService,
              private usersService: UsersService) { }

  ngOnInit() {
      this.form = new FormGroup({
          first_name: new FormControl(''),
          second_name: new FormControl(''),
          last_name: new FormControl(''),
          biography: new FormControl(''),
          level: new FormControl(''),
          avatar: new FormControl('')
      });

      this.id = this.route.snapshot.params['id'];
      if (this.id) {
          this.usersService.get(this.id).subscribe((res: {data: User}) => {
              console.log(res);
              this.user = res.data;
              this.form.patchValue(this.user);
          });
      } else if (this.myProfile) {
          this.usersService.getMyProfile().subscribe((res: {data: User}) => {
              console.log(res);
              this.user = res.data;
              this.id = this.user.id;
              this.form.patchValue(this.user);
          });
      }
  }

    ngAfterViewInit(): void {
        $(this.inputFile.nativeElement).on('change', event => {
            this.loading = true;
            const inputFile = event.target.files[0];
            if (!inputFile || !inputFile.name) {
                return;
            }
            this.uploadService.post(inputFile).subscribe((res: {location: string}) => {
                this.loading = false;
                this.file = inputFile;
                this.user.avatar = res.location;
                this.form.get('avatar').setValue(res.location);
            });
        });
    }

    submit({value, valid}: { value: User, valid: boolean }) {
        // localStorage.setItem('isLoggedin', 'true');
        if (!valid) {
            this.showerror = true;
            return;
        }
        this.usersService.partial_update(this.id, value).subscribe((res) => {
            console.log(res);
            this.router.navigateByUrl('/admin/user-table');
        });
    }

    onNewPassword() {
      this.usersService.set_password(this.id, this.newPassword).subscribe((res) => {
          if (res['code'] === 1) {
              this.showNewPasswordSuccess = false;
              this.showNewPasswordFailure = true;
              this.newPasswordFailureMessage = res['message'];
          } else {
              this.showNewPasswordSuccess = true;
              this.showNewPasswordFailure = false;
          }
          this.showNewPasswordInput = false;
          console.log(res);
      });
    }

    onChangePassword() {
        this.usersService.change_password(this.id, this.oldPassword, this.newPassword).subscribe((res) => {
            if (res['code'] === 1) {
                this.showNewPasswordSuccess = false;
                this.showNewPasswordFailure = true;
                this.newPasswordFailureMessage = res['message'];
            } else {
                this.showNewPasswordSuccess = true;
                this.showNewPasswordFailure = false;
            }
            this.showNewPasswordInput = false;
            console.log(res);
        });
    }

}
