import { Component, OnInit } from '@angular/core';
import User from '../../../shared/classes/user';
import { Router } from '@angular/router';
import { UsersService } from '../../../shared/services/user.service';
import { GeneralHelper } from '../../../shared/helpers/general.helper';
import { LocalDataSource } from 'ng2-smart-table';
import { DatePipe } from '@angular/common';
import { Deferred } from 'ng2-smart-table/lib/helpers';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

    users: User[];

    settings;
    source: LocalDataSource;

  constructor(private router: Router,
              private datePipe: DatePipe,
              private _domSanitizer: DomSanitizer,
              private userService: UsersService) { }

  ngOnInit() {
      this.userService.list().subscribe((res: {data: User[]}) => {
          this.users = GeneralHelper.isEmpty(res) ? [] : res.data;
          this.source = new LocalDataSource(this.users);
      });

      this.settings = {
          actions: {columnTitle: '', add: false, edit: false, delete: true},
          delete: {
              deleteButtonContent: 'Удалить',
              confirmDelete: true,
          },
          add: {
              confirmCreate: true,
          },
          edit: {
              confirmSave: true,
          },
          columns: {
              last_name: {
                  title: 'Имя'
              },
              role: {
                  title: 'Автор'
              },
              avatar: {
                  title: 'Миниатюра',
                  filter: false,
                  type: 'html',
                  valuePrepareFunction: (avatar) => {
                      if (avatar) {
                          return `<img src="https://androidios.kz:8000${avatar}" alt="...">`;
                      }
                      return '';
                  },
              },
              created_at: {
                  title: 'Создана',
                  editable: false,
                  valuePrepareFunction: (date) => {
                      if (date) {
                          return this.datePipe.transform(new Date(date), 'dd MMM yyyy');
                      }
                      return '';
                  },
                  filterFunction: (date, str) => {
                      if (date) {
                          return this.datePipe.transform(new Date(date), 'dd MMM yyyy').includes(str);
                      }
                      return false;
                  }
              }
          },
          attr: {
              class: 'table table-hover table-striped'
          }
      };
  }

    select(s: {data: User}) {
        if (s.data.role) {
            this.router.navigateByUrl(`/admin/profile-${s.data.role}/` + s.data.id);
        } else {
            this.router.navigateByUrl(`/admin/profile-sportsman/` + s.data.id);
        }
    }

    onDeleteConfirm(event: {confirm: Deferred, data: User}) {
        console.log(event);
        this.userService.delete(event.data.id).subscribe((res) => {
            console.log(res);
            event.confirm.resolve();
        }, () => {
            event.confirm.reject();
        });
    }

}
