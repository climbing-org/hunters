import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import User from '../../../shared/classes/user';
import Club from '../../../shared/classes/club';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadService } from '../../../shared/services/upload.service';
import { UsersService } from '../../../shared/services/user.service';
import { ClubService } from '../../../shared/services/club.service';
import { GeneralHelper } from '../../../shared/helpers/general.helper';

@Component({
  selector: 'app-club-page',
  templateUrl: './club-page.component.html',
  styleUrls: ['./club-page.component.scss']
})
export class ClubPageComponent implements OnInit, AfterViewInit {
    @ViewChild('inputFile') inputFile: ElementRef;

    slug: string;
    club: Club = new Club();
    file: File;
    loading = false;

    sportsmen: User[];
    judges: User[];
    selectedSportsmen: User[] = [];
    selectedJudges: User[] = [];
    dropdownSettings = {};

    date_from: {year: number, month: number, day: number};
    date_to: {year: number, month: number, day: number};

  constructor(private clubService: ClubService,
              private route: ActivatedRoute,
              private uploadService: UploadService,
              private usersService: UsersService,
              private router: Router) { }

  ngOnInit() {
      this.slug = this.route.snapshot.params['id'];
      if (this.slug) {
          this.clubService.get(this.slug).subscribe((res: {data: Club}) => {
              console.log(res);
              this.club = res.data;
              this.selectedSportsmen = this.club.sportsmans ? this.club.sportsmans : [];
              this.selectedSportsmen.forEach((s) => {
                  if (s['pk']) {
                      s.id = s['pk'];
                  }
              });
              this.selectedJudges = this.club.judges ? this.club.judges : [];
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
                this.club.logo = res.location;
            });
        });
    }
    submit() {
        this.club.sportsmans = [];
        this.selectedSportsmen.forEach((s) => {
            this.club.sportsmans.push(s.id);
        });
        this.club.judges = [];
        this.selectedJudges.forEach((s) => {
            this.club.judges.push(s.id);
        });
        if (this.slug) {
            this.clubService.update(this.slug, this.club).subscribe((res) => {
                this.router.navigateByUrl('/admin/club-table');
                console.log(res);
            });
        } else {
            this.clubService.post(this.club).subscribe((res) => {
                this.router.navigateByUrl('/admin/club-table');
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
