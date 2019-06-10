import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sportsman-rating-page',
  templateUrl: './sportsman-rating-page.component.html',
  styleUrls: ['./sportsman-rating-page.component.scss']
})
export class SportsmanRatingPageComponent implements OnInit {

    page = 1;
    pageSize = 7


  constructor() { }

  ngOnInit() {

  }
}
