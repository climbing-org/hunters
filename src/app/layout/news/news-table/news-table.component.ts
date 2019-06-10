import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import News from '../../../shared/classes/news';
import { NewsService } from '../../../shared/services/news.service';
import { GeneralHelper } from '../../../shared/helpers/general.helper';
import { LocalDataSource } from 'ng2-smart-table';
import { Deferred } from 'ng2-smart-table/lib/helpers';
import { DatePipe } from '@angular/common';
import Response from '../../../shared/classes/response';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-news-table',
  templateUrl: './news-table.component.html',
  styleUrls: ['./news-table.component.scss']
})
export class NewsTableComponent implements OnInit {

    news: News[];

    settings;
    source: LocalDataSource;

    constructor(private newsService: NewsService,
                private datePipe: DatePipe,
                private toastr: ToastrService,
                private router: Router) {
    }

    ngOnInit() {
        this.newsService.list().subscribe((res: {data: News[]}) => {
            console.log(res);
            this.news = GeneralHelper.isEmpty(res) ? [] : res.data;
            this.source = new LocalDataSource(this.news);
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

    select(s: {data: News}) {
        this.router.navigateByUrl('/admin/news-page/' + s.data.slug);
        console.log(s);
    }

    onDeleteConfirm(event: {confirm: Deferred, data: News}) {
        console.log(event);
        this.newsService.delete(event.data.slug).subscribe((res: Response) => {
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

    onSaveConfirm(event: {confirm: Deferred, newData: News}) {
        console.log(event);
        this.newsService.update(event.newData.slug, event.newData).subscribe((res) => {
            console.log(res);
            event.confirm.resolve();
        }, () => {
            event.confirm.reject();
        });
    }

    onCreateConfirm(event: {confirm: Deferred, newData: News}) {
        console.log(event);
        this.newsService.post(event.newData).subscribe((res) => {
            console.log(res);
            event.confirm.resolve();
        }, () => {
            event.confirm.reject();
        });
    }
}
