import { TestBed } from '@angular/core/testing';
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

  it('should fetch books from API and map response correctly', () => {
    const mockResponse = {
      items: [
        {
          volumeInfo: {
            title: 'Test Book',
            authors: ['Test Author'],
            industryIdentifiers: [{ identifier: '1234567890' }],
            publishedDate: '2020-01-01',
            categories: ['Test Category'],
          },
        },
      ],
    };

    service.getBookFormApi().subscribe((books: Book[]) => {
      expect(books.length).toBe(1);
      expect(books[0].title).toBe('Test Book');
      expect(books[0].author).toBe('Test Author');
      expect(books[0].isbn).toBe('1234567890');
      expect(books[0].publishDate).toBe('2020-01-01');
      expect(books[0].category).toBe('Test Category');
      expect(books[0].price).toBe(999);
    });

    const req = httpMock.expectOne(
      'https://www.googleapis.com/books/v1/volumes?q=genre#'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle missing fields gracefully', () => {
    const mockResponse = {
      items: [
        {
          volumeInfo: {
            title: 'Unknown Book',
          },
        },
      ],
    };

    service.getBookFormApi().subscribe((books: Book[]) => {
      expect(books[0].author).toBe('Unknown Author');
      expect(books[0].isbn).toBe('N/A');
      expect(books[0].publishDate).toBe('Unknown Date');
      expect(books[0].category).toBe('Uncategorized');
    });

    const req = httpMock.expectOne(
      'https://www.googleapis.com/books/v1/volumes?q=genre#'
    );
    req.flush(mockResponse);
  });

  it('should correctly calculate book age', () => {
    const age = service.calculateBookAge('2022-01-01');
    expect(age).toContain('years');
    expect(age).toContain('months');
    expect(age).toContain('days');
  });
});
