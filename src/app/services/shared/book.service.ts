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
    console.log('7 correct data pass ->', updateBook);
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
    console.log('7 correct ->', updateBook);
    console.log('7  correct ->', index);
    console.log('7 correct ->', this.apiBooks.length);

    if (index >= 0 && index < this.apiBooks.length) {
      console.log('8 data update successfully->', this.apiBooks[index]);

      this.apiBooks[index] = updateBook;
      console.log('9 data before update ->', this.apiBooks[index]);
      console.log('10 data after update ->', this.apiBooks);
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