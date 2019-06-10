import { Component, OnInit } from '@angular/core';
import Event from '../../../shared/classes/event';
import { EventService } from '../../../shared/services/event.service';
import { Router } from '@angular/router';
import { GeneralHelper } from '../../../shared/helpers/general.helper';
import { LocalDataSource } from 'ng2-smart-table';
import { DatePipe } from '@angular/common';
import { Deferred } from 'ng2-smart-table/lib/helpers';
import Response from '../../../shared/classes/response';

@Component({
  selector: 'app-events-table',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.scss']
})
export class EventsTableComponent implements OnInit {

    events: Event[];

    settings;
    source: LocalDataSource;

  constructor(private eventService: EventService,
              private datePipe: DatePipe,
              private router: Router) { }

  ngOnInit() {
      this.eventService.list().subscribe((res: {data: Event[]}) => {
          this.events = GeneralHelper.isEmpty(res) ? [] : res.data;
          this.source = new LocalDataSource(this.events);
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

    select(s: {data: Event}) {
        this.router.navigateByUrl('/admin/events-page/' + s.data.slug);
        console.log(s);
    }

    onDeleteConfirm(event: {confirm: Deferred, data: Event}) {
        this.eventService.delete(event.data.slug).subscribe((res: Response) => {
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
