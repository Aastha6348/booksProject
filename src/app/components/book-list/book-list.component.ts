import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/services';
import { CommonFunctions } from 'src/app/common/common.functions';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, switchMap, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  selectedCategory = '';
  searchValue = '';
  showClose = false;
  disablePrevious = true;
  disableNext = false;
  isMobile: boolean;
  booksData: any[] = [];
  nextPageUrl = '';
  PreviousPageUrl = '';
  searchField: FormControl;
  coolForm: FormGroup;

  constructor(
    private router: ActivatedRoute,
    private appService: AppService,
    private route: Router,
    private cf: CommonFunctions,
    private fb:FormBuilder,
  ) { 
    this.searchField = new FormControl();
      this.coolForm = fb.group({search: this.searchField});
      this.searchField.valueChanges.pipe(debounceTime(400), distinctUntilChanged(),
          switchMap(term =>
              this.appService.getFilteredBooks(term))).subscribe((res: any) => {
              this.PreviousPageUrl = res.previous;
              this.nextPageUrl = res.next;
              this.booksData = this.fetchDisplayBooks(res.results);
              this.enableCancelButton();
            });
  }

  /*
    This function does two things At the time of loading this component:
    1.  Fetching the Selected Genre
    2.  Loading the 1st Page of Books
  */
  ngOnInit() {
    this.isMobile = this.cf.isMobile();
    this.router.queryParams
      .subscribe(params => {
        this.selectedCategory = params.genre;
      });
    this.getBooksData();
  }

  getBooksData() {
    this.appService.getBooks().subscribe((res: any) => {
      this.PreviousPageUrl = res.previous;
      this.nextPageUrl = res.next;
      this.booksData = this.fetchDisplayBooks(res.results);
    });
  }

  fetchDisplayBooks(data) {
    const bookData = [];
    for(const result of data) {
      loop2:
      for(const sub of result.subjects) {
        if(sub.toLocaleLowerCase().includes(this.selectedCategory)) {
          bookData.push(result);
          break loop2;
        }
      }
    }
    return bookData;
  }

  /*
    This function handles Search Box data and triggers the API call to get the
    search keyword based data After 3 seconds of entering the data.
  */
  enableCancelButton() {
    const data = this.coolForm.get('search').value;
    if (data.length > 1) {
      this.showClose = true;
    } else {
      this.showClose = false;
      this.getBooksData();
    }
  }

  /*
    This functions clears the search input box
  */
  clearSearch() {
    this.searchValue = '';
    this.showClose = false;
    this.coolForm.reset();
    this.getBooksData();
  }

  /*
  This functions handles upwards scroll
  */
  previousClicked() {
    if (this.PreviousPageUrl !== null) {
      this.appService.getPageData(this.PreviousPageUrl).subscribe((res: any) => {
        this.PreviousPageUrl = res.previous;
        this.nextPageUrl = res.next;
        if (this.PreviousPageUrl && this.PreviousPageUrl != null) {
          this.disablePrevious = false;
        } else {
          this.disablePrevious = true;
        }
        if (this.nextPageUrl && this.nextPageUrl != null) {
          this.disableNext = false;
        } else {
          this.disableNext = true;
        }
        this.booksData = this.fetchDisplayBooks(res.results);
      });
    } else {
      alert('No Previous Data Available');
    }
  }

  /*
    This functions handles downwards scroll
  */
  nextClicked() {
    if (this.nextPageUrl !== null) {
      this.appService.getPageData(this.nextPageUrl).subscribe((res: any) => {
        this.PreviousPageUrl = res.previous;
        this.nextPageUrl = res.next;
        if (this.PreviousPageUrl && this.PreviousPageUrl != null) {
          this.disablePrevious = false;
        } else {
          this.disablePrevious = true;
        }
        if (this.nextPageUrl && this.nextPageUrl != null) {
          this.disableNext = false;
        } else {
          this.disableNext = true;
        }
        this.booksData = this.fetchDisplayBooks(res.results);
      });
    } else {
      alert('No Next Data Available');
    }
  }

  /*
  This functions handles back event to route to dashboard component
  */
  navigate() {
    this.route.navigate(['dashboard']);
  }


  openBookData(data) {
    // tslint:disable-next-line:forin
    for (const key in data) {
      if (key.includes('text/html;')) {
        window.location.href = data[key.toString()];
        break;
      }
      if (key.includes('application/rdf+xml;')) {
        window.location.href = data[key.toString()];
        break;
      }
      if (key.includes('text/plain; charset=utf-8')) {
        window.location.href = data[key.toString()];
        break;
      }
    }
  }
}
