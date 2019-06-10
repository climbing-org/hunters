import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadService } from '../../../shared/services/upload.service';
import { EventService } from '../../../shared/services/event.service';
import Event from '../../../shared/classes/event';
import User from '../../../shared/classes/user';
import { GeneralHelper } from '../../../shared/helpers/general.helper';
import { UsersService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss']
})
export class EventsPageComponent implements OnInit, AfterViewInit {
    @ViewChild('inputFile') inputFile: ElementRef;

    slug: string;
    event: Event = new Event();
    file: File;
    loading = false;

    sportsmen: User[];
    judges: User[];
    selectedSportsmen: User[] = [];
    selectedJudges: User[] = [];
    dropdownSettings = {};

    date_from: {year: number, month: number, day: number};
    date_to: {year: number, month: number, day: number};

  constructor(private eventsService: EventService,
              private route: ActivatedRoute,
              private uploadService: UploadService,
              private usersService: UsersService,
              private router: Router) { }

  ngOnInit() {
      this.slug = this.route.snapshot.params['id'];
      if (this.slug) {
          this.eventsService.get(this.slug).subscribe((res: {data: Event}) => {
              console.log(res);
              this.event = res.data;
              this.selectedSportsmen = this.event.sportsmans ? this.event.sportsmans : [];
              this.selectedSportsmen.forEach((s) => {
                  if (s['pk']) {
                      s.id = s['pk'];
                  }
              });
              this.selectedJudges = this.event.judges ? this.event.judges : [];
              this.selectedJudges.forEach((s) => {
                  if (s['pk']) {
                      s.id = s['pk'];
                  }
              });
          });
      }
      this.usersService.list('sportsman').subscribe((res: {data: User[]}) => {
          this.sportsmen = GeneralHelper.isEmpty(res) ? [] : res.data;
          console.log(this.sportsmen);
      });
      this.usersService.list('judge').subscribe((res: {data: User[]}) => {
          this.judges = GeneralHelper.isEmpty(res) ? [] : res.data;
          console.log(this.judges);
      });

      this.dropdownSettings = {
          singleSelection: false,
          idField: 'id',
          textField: 'first_name',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true
      };
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
              this.event.logo = res.location;
          });
      });
  }
    submit() {
        this.event.sportsmans = [];
        this.selectedSportsmen.forEach((s) => {
          this.event.sportsmans.push(s.id);
        });
        this.event.judges = [];
        this.selectedJudges.forEach((s) => {
            this.event.judges.push(s.id);
        });
        if (this.date_from) {
            this.event.date_from = new Date(this.date_from.year, this.date_from.month - 1, this.date_from.day);
        }
        if (this.date_to) {
            this.event.date_to = new Date(this.date_to.year, this.date_to.month - 1, this.date_to.day);
        }
        if (this.slug) {
            this.eventsService.update(this.slug, this.event).subscribe((res) => {
                this.router.navigateByUrl('/admin/events-table');
                console.log(res);
            });
        } else {
            this.eventsService.post(this.event).subscribe((res) => {
                this.router.navigateByUrl('/admin/events-table');
                console.log(res);
            });
        }
    }

    onItemSelect(item: any) {
        console.log(item);
        console.log(this.selectedSportsmen);
    }
    onSelectAll(items: any) {
        console.log(items);
    }

}
