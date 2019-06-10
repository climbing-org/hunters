import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../shared/services/menu.service';
import Menu from '../../../shared/classes/menu';
import { Router } from '@angular/router';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import Response from '../../../shared/classes/response';

@Component({
  selector: 'app-menu-table',
  templateUrl: './menu-table.component.html',
  styleUrls: ['./menu-table.component.scss']
})
export class MenuTableComponent implements OnInit {

    menu: Menu[];
    selectedMenu1: Menu;
    selectedMenu2: Menu;
    selectedMenu3: Menu;
    selectedMenu4: Menu;

  constructor(private menuService: MenuService,
              private router: Router) { }

  ngOnInit() {
      this.initMenu();
  }

  initMenu() {
      this.menuService.list().subscribe((res: {data: Menu[]}) => {
          this.menu = res.data;
      });
  }

  edit(m: Menu) {
      this.router.navigateByUrl('/admin/menu/' + m.id);
      console.log(m);
  }

    delete(m: Menu) {
        this.menuService.delete(m.id).subscribe((res: Response) => {
            console.log(res);
            this.initMenu();
        });
    }

    drop(event: CdkDragDrop<Menu[]>) {
      console.log(event);
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
        }
    }

}
