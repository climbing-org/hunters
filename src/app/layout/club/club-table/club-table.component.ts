import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import Club from '../../../shared/classes/club';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ClubService } from '../../../shared/services/club.service';
import { GeneralHelper } from '../../../shared/helpers/general.helper';
import { Deferred } from 'ng2-smart-table/lib/helpers';

@Component({
  selector: 'app-club-table',
  templateUrl: './club-table.component.html',
  styleUrls: ['./club-table.component.scss']
})
export class ClubTableComponent implements OnInit {

    clubs: Club[];

    settings;
    source: LocalDataSource;

  constructor(private clubService: ClubService,
              private datePipe: DatePipe,
              private router: Router) { }

  ngOnInit() {
      this.clubService.list().subscribe((res: {data: Club[]}) => {
          this.clubs = GeneralHelper.isEmpty(res) ? [] : res.data;
          this.source = new LocalDataSource(this.clubs);
      });

      this.settings = {
          actions: {
              columnTitle: '', add: false, edit: false, delete: true
          },
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
              name: {
                  title: 'Имя'
              },
              region: {
                  title: 'Регион'
              },
              city: {
                  title: 'Город'
              },
              address: {
                  title: 'Адрес'
              }
          },
          attr: {
              class: 'table table-hover table-striped'
          }
      };
  }

    select(s: {data: Club}) {
        this.router.navigateByUrl('/admin/club-page/' + s.data.slug);
        console.log(s);
    }

    onDeleteConfirm(event: {confirm: Deferred, data: Club}) {
        this.clubService.delete(event.data.slug).subscribe((res) => {
            event.confirm.resolve();
        }, () => {
            event.confirm.reject();
        });
    }

}
