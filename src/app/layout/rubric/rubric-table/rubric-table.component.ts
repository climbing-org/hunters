import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import Rubric from '../../../shared/classes/rubric';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { RubricService } from '../../../shared/services/rubric.service';
import { GeneralHelper } from '../../../shared/helpers/general.helper';
import { Deferred } from 'ng2-smart-table/lib/helpers';
import Response from '../../../shared/classes/response';

@Component({
  selector: 'app-rubric-table',
  templateUrl: './rubric-table.component.html',
  styleUrls: ['./rubric-table.component.scss']
})
export class RubricTableComponent implements OnInit {
    rubrics: Rubric[];

    settings;
    source: LocalDataSource;

  constructor(private rubricService: RubricService,
              private datePipe: DatePipe,
              private router: Router) { }

  ngOnInit() {
      this.rubricService.list().subscribe((res: {data: Rubric[]}) => {
          this.rubrics = GeneralHelper.isEmpty(res) ? [] : res.data;
          this.source = new LocalDataSource(this.rubrics);
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

    select(s: {data: Rubric}) {
        this.router.navigateByUrl('/admin/rubric-page/' + s.data.slug);
        console.log(s);
    }

    onDeleteConfirm(event: {confirm: Deferred, data: Rubric}) {
        this.rubricService.delete(event.data.slug).subscribe((res: Response) => {
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
