import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import News from '../../../shared/classes/news';
import { ActivatedRoute, Router } from '@angular/router';
import Rubric from '../../../shared/classes/rubric';
import { RubricService } from '../../../shared/services/rubric.service';

@Component({
  selector: 'app-rubric-page',
  templateUrl: './rubric-page.component.html',
  styleUrls: ['./rubric-page.component.scss']
})
export class RubricPageComponent implements OnInit, AfterViewInit {

    slug: string;
    rubric: Rubric = new Rubric();
    nameError: string;
    errorMessage: string;

  constructor(private rubricService: RubricService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
      this.slug = this.route.snapshot.params['id'];
      if (this.slug) {
          this.rubricService.get(this.slug).subscribe((res: {data: Rubric}) => {
              console.log(res);
              this.rubric = res.data;
          });
      }
  }

    ngAfterViewInit() {
    }

    submit() {
        if (this.slug) {
            this.rubricService.update(this.slug, this.rubric).subscribe((res) => {
                console.log(res);
                if (res['code'] === 0) {
                    this.router.navigateByUrl('/admin/rubric-table');
                } else if (res['data'] && res['data']['name'] && res['data']['name'].length) {
                    this.nameError = res['data']['name'][0];
                } else {
                    this.errorMessage = 'Что то пошло не так';
                }
            });
        } else {
            this.rubricService.post(this.rubric).subscribe((res) => {
                if (res['code'] === 0) {
                    this.router.navigateByUrl('/admin/rubric-table');
                } else if (res['data'] && res['data']['name'] && res['data']['name'].length) {
                    console.log(res);
                    this.nameError = res['data']['name'][0];
                } else {
                    this.errorMessage = 'Что то пошло не так';
                }
            });
        }
    }

    close() {
        this.errorMessage = '';
    }

}
