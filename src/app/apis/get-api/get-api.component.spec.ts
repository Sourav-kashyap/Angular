import { TestBed } from '@angular/core/testing';
import { faker } from '@faker-js/faker';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { GetApiService, Book } from './get-api.component';

describe('GetApiService', () => {
  let service: GetApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetApiService],
    });
    service = TestBed.inject(GetApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch books from API', () => {
    const mockBook = {
      title: faker.lorem.words(3),
      author: faker.person.fullName(),
      isbn: faker.string.numeric(10),
      publishDate: faker.date.past({ years: 10 }).toISOString().split('T')[0],
      category: faker.commerce.department(),
      price: faker.number.int({ min: 100, max: 2000 }),
    };

    const mockResponse = {
      items: [
        {
          volumeInfo: {
            title: mockBook.title,
            authors: [mockBook.author],
            industryIdentifiers: [{ identifier: mockBook.isbn }],
            publishedDate: mockBook.publishDate,
            categories: [mockBook.category],
          },
        },
      ],
    };

    service.getBookFormApi().subscribe((books: Book[]) => {
      expect(books.length).toBe(1);
      expect(books[0].title).toBe(mockBook.title);
      expect(books[0].author).toBe(mockBook.author);
      expect(books[0].isbn).toBe(mockBook.isbn);
      expect(books[0].publishDate).toBe(mockBook.publishDate);
      expect(books[0].category).toBe(mockBook.category);
      expect(books[0].price).toBe(mockBook.price);
    });

    const req = httpMock.expectOne(
      'https://www.googleapis.com/books/v1/volumes?q=genre#' // Ensure this URL is correct
    );
    expect(req.request.method).toBe('GET');

    req.flush(
      mockResponse.items.map((item) => ({
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors[0] || 'Unknown Author', // Default fallback
        isbn: item.volumeInfo.industryIdentifiers[0]?.identifier || 'N/A', // Default fallback
        publishDate: item.volumeInfo.publishedDate || 'Unknown Date', // Default fallback
        category: item.volumeInfo.categories[0] || 'Uncategorized', // Default fallback
        price: mockBook.price, // Adding price manually
      }))
    );
  });

  it('should handle missing fields', () => {
    const mockResponse = {
      items: [
        {
          volumeInfo: {
            title: faker.lorem.words(3), // Generate random book title
            // Missing authors, industryIdentifiers, publishedDate, categories
          },
        },
      ],
    };

    service.getBookFormApi().subscribe((books: Book[]) => {
      expect(books.length).toBe(1);
      expect(books[0].title).toBe(mockResponse.items[0].volumeInfo.title);
      expect(books[0].author).toBe('Unknown Author'); // Default fallback
      expect(books[0].isbn).toBe('N/A'); // Default fallback
      expect(books[0].publishDate).toBe('Unknown Date'); // Default fallback
      expect(books[0].category).toBe('Uncategorized'); // Default fallback
    });

    const req = httpMock.expectOne(
      'https://www.googleapis.com/books/v1/volumes?q=genre#' // Ensure this URL is correct
    );
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

  it('should correctly calculate book age', () => {
    const age = service.calculateBookAge('2022-01-01');
    expect(age).toContain('years');
    expect(age).toContain('months');
    expect(age).toContain('days');
  });
});