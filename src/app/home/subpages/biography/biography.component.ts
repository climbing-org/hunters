import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-biography',
  templateUrl: './biography.component.html',
  styleUrls: ['./biography.component.scss']
})
export class BiographyComponent implements OnInit, AfterViewInit {

    navItem = 1;

  constructor() { }

  ngOnInit() {
      window.scrollTo(0, 0);
  }

  ngAfterViewInit(): void {
      $('#pills-tab a').on('click', function (e) {
          console.log('aaaa');
          e.preventDefault();
          $(this).tab('show');
      });
  }

}
