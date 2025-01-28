import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private books: any[] = [];
  constructor() {}
  addBook(book: any) {
    this.books.push(book);
  }
  getBooks() {
    return this.books;
  }

  updateBook(index: number, updateBook: any) {
    if (index >= 0 && index < this.books.length) {
      this.books[index] = updateBook;
    } else {
      console.log('Invalid index');
    }
  }

  deleteBook(index: number) {
    if (index >= 0 && index < this.books.length) {
      this.books.splice(index, 1);
    } else {
      console.log('Invalid index');
    }
  }
}
