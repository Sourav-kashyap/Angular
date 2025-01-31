import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../services/shared/book.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { NavigationDataServiceService } from '../../services/tempStore/navigation-data-service.service';
import { GetApiService } from '../../apis/get-api/get-api.component';
@Component({
  selector: 'app-book',
  imports: [NgFor, DatePipe],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent implements OnInit {
  books: any[] = [];
  apiBooks: any[] = [];

  constructor(
    private router: Router,
    private bookService: BookService,
    private navigationDataService: NavigationDataServiceService,
    private getApiService: GetApiService
  ) {}

  calculateBookAge(publishDate: string): string {
    const publishedDate = new Date(publishDate);
    const currentDate = new Date();

    let years = currentDate.getFullYear() - publishedDate.getFullYear();
    let months = currentDate.getMonth() - publishedDate.getMonth();
    let days = currentDate.getDate() - publishedDate.getDate();

    if (days < 0) {
      const previousMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
      ).getDate();
      days += previousMonth;
      months--;
    }

    if (months < 0) {
      months += 12;
      years--;
    }
    return `${days} days, ${months} months, ${years} years `;
  }

  ngOnInit() {
    this.books = this.bookService.getBooks();
    if (!this.navigationDataService.getIsApiData()) {
      this.getApiService.getBookFormApi().subscribe({
        next: (data: any[]) => {
          this.apiBooks = data; // Assign the API response to apiBooks
        },
        error: (error) => {
          console.error('Error fetching API books:', error);
        },
        complete: () => {
          console.log('API call completed');
        },
      });
    }
    this.bookService.addApiBooks(this.apiBooks);
    this.apiBooks = this.bookService.getApiBooks();
  }

  editBook(index: number) {
    const bookToEdit = this.books[index];
    this.navigationDataService?.setData({ bookToEdit, index });
    this.router.navigate(['/book-form']);
  }

  deleteBook(index: number) {
    this.bookService.deleteBook(index);
    this.books = this.bookService.getBooks();
  }

  apiEditBook(index: number) {
    const bookToEdit = this.apiBooks[index];
    this.navigationDataService?.setApiData({ bookToEdit, index });
    this.router.navigate(['/book-form']);
  }

  apiDeleteBook(index: number) {
    this.bookService.apiDeleteBook(index);
    this.apiBooks = this.bookService.getApiBooks();
  }

  navigateToBookForm() {
    this.router.navigate(['/book-form']); // Navigate to the book form page
  }
}
