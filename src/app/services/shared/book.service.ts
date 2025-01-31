import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private books: any[] = [];
  private apiBooks: any[] = [];
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
      console.log('Invalid book index ');
    }
  }

  deleteBook(index: number) {
    if (index >= 0 && index < this.books.length) {
      this.books.splice(index, 1);
    } else {
      console.log('Invalid book index');
    }
  }

  addApiBooks(book: any) {
    this.apiBooks.push(...book); // Spread operator to push multiple items
  }

  getApiBooks() {
    return this.apiBooks;
  }

  apiUpdateBook(index: number, updateBook: any) {
    if (index >= 0 && index < this.apiBooks.length) {
      this.apiBooks[index] = updateBook;
    } else {
      console.log('Invalid apiBook index');
    }
  }

  apiDeleteBook(index: number) {
    if (index >= 0 && index < this.apiBooks.length) {
      this.apiBooks.splice(index, 1);
    } else {
      console.log('Invalid apiBook index');
    }
  }
}