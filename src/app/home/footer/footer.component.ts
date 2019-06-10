import { Component, OnInit } from '@angular/core';
import Menu from '../../shared/classes/menu';
import { MenuService } from '../../shared/services/menu.service';

@Component({
  selector: 'ngx-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    menu: Menu[];

  constructor(private menuService: MenuService) { }

  ngOnInit() {
      this.menuService.list().subscribe((res: {data: Menu[]}) => {
          if (res.data) {
              if (res.data['detail']) {
                  this.menu = [];
              } else {
                  this.menu = res.data.filter(menu => menu.footer);
              }
          } else {
              this.menu = [];
          }
          console.log(this.menu);
      });
  }

}
