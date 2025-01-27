import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private books:any[]=[];
  constructor() { }
  addBook(book:any){
    this.books.push(book);
}
getBook(){
  return this.books;
}

}
