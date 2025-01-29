import { Injectable } from '@angular/core';
import { BookService } from '../../services/shared/book.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Book {
  title: string;
  author: string;
  isbn: string;
  publishDate: string;
  category: string;
  age: string;
  price?: number; // Optional field, as it might not be available in the API
}

@Injectable({
  providedIn: 'root',
})
export class GetApiService {
  constructor(private http: HttpClient, private bookService: BookService) {}
  getBookFormApi(): Observable<Book[]> {
    return this.http
      .get<any>('https://www.googleapis.com/books/v1/volumes?q=genre#')
      .pipe(
        map((res) => {
          return res.items.map((item: any) => ({
            title: item.volumeInfo.title,
            author: item.volumeInfo.authors?.[0] || 'Unknown Author', // Handle missing author
            isbn: item.volumeInfo.industryIdentifiers?.[0]?.identifier || 'N/A', // Handle missing ISBN
            publishDate: item.volumeInfo.publishedDate || 'Unknown Date', // Handle missing publish date
            category: item.volumeInfo.categories?.[0] || 'Uncategorized', // Handle missing category
            age: this.calculateBookAge(item.volumeInfo.publishedDate), // Default price, as it's not available in the API
            price: 999, // Default price, as it's not available in the API
          }));
        })
      );
  }

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
}
