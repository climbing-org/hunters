import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MenuService } from '../../shared/services/menu.service';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    animations: [routerTransition()]
})
export class FormComponent implements OnInit {

    test: string;

    constructor(private testService: MenuService) {}

    ngOnInit() {}

    submit() {
        // this.testService.get().subscribe((r) => {
        //     console.log(r);
        // });
        // this.testService.post('1').subscribe((r) => {
        //     console.log(r);
        // });
        // this.testService.delete().subscribe((r) => {
        //     console.log(r);
        // });
    }
}
