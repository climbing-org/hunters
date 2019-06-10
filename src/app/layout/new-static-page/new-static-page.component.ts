import { Component, Input, OnInit } from '@angular/core';
import { StaticPageService } from '../../shared/services/static-page.service';
import StaticPage from '../../shared/classes/static-page';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-static-page',
  templateUrl: './new-static-page.component.html',
  styleUrls: ['./new-static-page.component.scss']
})
export class NewStaticPageComponent implements OnInit {

    slug: string;
    staticPage: StaticPage = new StaticPage();
    dataModel: any;

  constructor(private staticPageService: StaticPageService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
      this.slug = this.route.snapshot.params['id'];
      if (this.slug) {
        this.staticPageService.get(this.slug).subscribe((staticPage: {data: StaticPage}) => {
            console.log(staticPage);
            this.staticPage = staticPage.data;
        });
      }
  }

  submit() {
      console.log(this.dataModel);
      if (this.slug) {
          this.staticPageService.update(this.slug, this.staticPage).subscribe((res) => {
              this.router.navigateByUrl('/admin/static-page-table');
              console.log(res);
          });
      } else {
          this.staticPageService.post(this.staticPage).subscribe((res) => {
              this.router.navigateByUrl('/admin/static-page-table');
              console.log(res);
          });
      }
  }

}
