import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { CommonFunctions } from 'src/app/common/common.functions';
// import {} from '../../../assets'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isMobile = false;
  constructor(private router: Router,
              private cf: CommonFunctions
    ) {}
  categories = [
    {img_icon: '../../../assets/Fiction.svg', title: 'Fiction'},
    {img_icon: '../../../assets/Drama.svg', title: 'Drama'},
    {img_icon: '../../../assets/Humour.svg', title: 'Humour'},
    {img_icon: '../../../assets/Politics.svg', title: 'Politics'},
    {img_icon: '../../../assets/Philosophy.svg', title: 'Philosophy'},
    {img_icon: '../../../assets/History.svg', title: 'History'},
    {img_icon: '../../../assets/Adventure.svg', title: 'Adventure'},
  ];

  ngOnInit() {
    this.isMobile = this.cf.isMobile();
  }

  /*
    This function is used to router to Listing Component with selected Genre
  */
  getBooks(title) {
    this.router.navigate(['bookList'], { queryParams: { genre: title.toLowerCase() } });
  }
}
