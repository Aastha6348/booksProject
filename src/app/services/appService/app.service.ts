import { Injectable } from '@angular/core';
import { RestService } from '../restService/rest.service';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private restService: RestService) { }

  getBooks() {
    return this.restService.get(encodeURI('http://skunkworks.ignitesol.com:8000/books/?mime_type=image'));
  }

  getPageData(pageUrl) {
    return this.restService.get(encodeURI(pageUrl));
  }

  getFilteredBooks(search_keyword) {
    if(search_keyword) {
    return this.restService.get(encodeURI('http://skunkworks.ignitesol.com:8000/books/?mime_type=image&search='+search_keyword));
  } 
  return EMPTY;
}

}
