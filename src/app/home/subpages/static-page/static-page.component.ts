import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StaticPageService } from '../../../shared/services/static-page.service';
import StaticPage from '../../../shared/classes/static-page';

@Component({
  selector: 'app-static-page',
  templateUrl: './static-page.component.html',
  styleUrls: ['./static-page.component.scss']
})
export class StaticPageComponent implements OnInit {

    staticPageId: string;
    staticPage: StaticPage;

  constructor(private activeRoute: ActivatedRoute,
              private staticPageService: StaticPageService
              ) { }

  ngOnInit() {
      this.staticPageId = this.activeRoute.snapshot.params['id'];
      this.activeRoute.params.subscribe((value) => {
          this.staticPageId = value['id'];
          this.staticPageService.get(this.staticPageId).subscribe((res: {data: StaticPage}) => {
              this.staticPage = res.data;
          });
      });

      console.log(this.staticPageId);
  }

}
