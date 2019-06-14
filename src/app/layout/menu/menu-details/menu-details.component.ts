import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Menu from '../../../shared/classes/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../../../shared/services/menu.service';
import { StaticPageService } from '../../../shared/services/static-page.service';
import StaticPage from '../../../shared/classes/static-page';
import Rubric from '../../../shared/classes/rubric';
import { RubricService } from '../../../shared/services/rubric.service';

@Component({
  selector: 'app-menu-details',
  templateUrl: './menu-details.component.html',
  styleUrls: ['./menu-details.component.scss']
})
export class MenuDetailsComponent implements OnInit {

    menu: Menu = new Menu();
    nameError: string;
    errorMessage: string;
    slug: string;
    menuIds: {name: string, id: number}[] = [];
    staticPage: StaticPage[] = [];
    rubrics: Rubric[] = [];

    // @ViewChild('staticPage') staticPage: ElementRef;

  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private menuService: MenuService,
              private staticPageService: StaticPageService,
              private rubricService: RubricService) { }

  ngOnInit() {
      this.slug = this.activeRoute.snapshot.params['id'];
      if (this.slug) {
          this.menuService.get(this.slug).subscribe((res: {data: Menu}) => {
              console.log(res);
              this.menu = res.data;
              // console.log($(this.staticPage.nativeElement));
              // $(this.staticPage.nativeElement)[0].value = this.menu.static_page;
              this.getSelectData();
          });
      } else {
          this.getSelectData();
      }
  }

  getSelectData(): void {
      this.menuService.list().subscribe( (res: {data: Menu[]}) => {
          res.data.forEach((menu) => {
              if (this.menu.id !== menu.id) this.menuIds.push({name: menu.name, id: menu.id});
              console.log(this.menuIds);
              if (menu.childs  && menu.childs.length) {
                  menu.childs.forEach((m) => {
                      if (this.menu.id !== menu.id) this.menuIds.push({name: m.name, id: m.id});
                      if (m.childs && m.childs.length) {
                          m.childs.forEach((m1) => {
                              if (this.menu.id !== menu.id) this.menuIds.push({name: m1.name, id: m1.id});
                              if (m1.childs && m1.childs.length) {
                                  m1.childs.forEach((m2) => {
                                      if (this.menu.id !== menu.id) this.menuIds.push({name: m2.name, id: m2.id});
                                  });
                              }
                          });
                      }
                  });
              }
          });
      });
      this.staticPageService.list().subscribe((res: {data: StaticPage[]}) => {
          this.staticPage = res.data;
      });
      this.rubricService.list().subscribe((res: {data: Rubric[]}) => {
          this.rubrics = res.data;
      });
  }

    submit() {
        if (this.slug) {
            this.menuService.update(this.slug, this.menu).subscribe((res) => {
                console.log(res);
                if (res['code'] === 0) {
                    this.router.navigateByUrl('/admin/menu-table');
                } else if (res['data'] && res['data']['name'] && res['data']['name'].length) {
                    this.nameError = res['data']['name'][0];
                } else {
                    this.errorMessage = 'Что то пошло не так';
                }
            });
        } else {
            this.menuService.post(this.menu).subscribe((res) => {
                console.log(res);
                if (res['code'] === 0) {
                    this.router.navigateByUrl('/admin/menu-table');
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
