import { Component, OnInit } from '@angular/core';
import { StaticPageService } from '../../shared/services/static-page.service';
import StaticPage from '../../shared/classes/static-page';
import { Router } from '@angular/router';
import { GeneralHelper } from '../../shared/helpers/general.helper';
import { LocalDataSource } from 'ng2-smart-table';
import { DatePipe } from '@angular/common';
import { Deferred } from 'ng2-smart-table/lib/helpers';
import Response from '../../shared/classes/response';

@Component({
  selector: 'app-static-page-table',
  templateUrl: './static-page-table.component.html',
  styleUrls: ['./static-page-table.component.scss']
})
export class StaticPageTableComponent implements OnInit {

    staticPages: StaticPage[];

    settings;
    source: LocalDataSource;

  constructor(private staticPageService: StaticPageService,
              private datePipe: DatePipe,
              private router: Router) { }

  ngOnInit() {
      this.staticPageService.list().subscribe((res: {data: StaticPage[]}) => {
          this.staticPages = GeneralHelper.isEmpty(res) ? [] : res.data;
          this.source = new LocalDataSource(this.staticPages);
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
              name: {
                  title: 'Имя'
              },
              author: {
                  title: 'Автор'
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

  select(s: {data: StaticPage}) {
      this.router.navigateByUrl('/admin/static-page/' + s.data.slug);
      console.log(s);
  }

    onDeleteConfirm(event: {confirm: Deferred, data: StaticPage}) {
        this.staticPageService.delete(event.data.slug).subscribe((res: Response) => {
            console.log(res);
            if (!res) {
                event.confirm.resolve();
                return;
            }
            if (res && res.code === 0) {
                event.confirm.resolve();
                return;
            }
            event.confirm.reject();
        }, () => {
            event.confirm.reject();
        });
    }

}
