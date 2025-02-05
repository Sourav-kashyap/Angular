
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { faker } from '@faker-js/faker';

import { BookComponent } from './book.component';
import { BookService } from '../../services/shared/book.service';
import { NavigationDataServiceService } from '../../services/tempStore/navigation-data-service.service';
import { GetApiService } from '../../apis/get-api/get-api.component';
import { SearchService } from '../../services/search/search.service';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let bookService: jasmine.SpyObj<BookService>;
  let navigationDataService: jasmine.SpyObj<NavigationDataServiceService>;
  let getApiService: jasmine.SpyObj<GetApiService>;
  let searchService: jasmine.SpyObj<SearchService>;
  let searchQuerySubject: Subject<string>;
  let mockBooks: any[];
  let mockApiBooks: any[];

  beforeEach(async () => {
    mockBooks = Array.from({ length: 2 }, () => ({
      title: faker.lorem.words(3),
      author: faker.person.fullName(),
      isbn: faker.string.numeric(10),
      category: faker.helpers.arrayElement([
        'Fiction',
        'Non-Fiction',
        'Sci-Fi',
      ]),
      publishDate: faker.date.past().toISOString().split('T')[0],
    }));

    mockApiBooks = Array.from({ length: 2 }, () => ({
      title: faker.lorem.words(3),
      author: faker.person.fullName(),
      isbn: faker.string.numeric(10),
      category: faker.helpers.arrayElement([
        'Fiction',
        'Non-Fiction',
        'Sci-Fi',
      ]),
      publishDate: faker.date.past().toISOString().split('T')[0],
    }));

    bookService = jasmine.createSpyObj('BookService', [
      'getBooks',
      'deleteBook',
      'addApiBooks',
      'getApiBooks',
      'apiDeleteBook',
    ]);

    navigationDataService = jasmine.createSpyObj(
      'NavigationDataServiceService',
      ['setData', 'setApiData', 'getIsApiData']
    );

    getApiService = jasmine.createSpyObj('GetApiService', ['getBookFormApi']);
    searchService = jasmine.createSpyObj('SearchService', ['searchQuery$']);

    searchQuerySubject = new Subject<string>();
    searchService.searchQuery$ = searchQuerySubject.asObservable();

    bookService.getBooks.and.returnValue(mockBooks);
    bookService.getApiBooks.and.returnValue(mockApiBooks);
    getApiService.getBookFormApi.and.returnValue(of(mockApiBooks));
    navigationDataService.getIsApiData.and.returnValue(false);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, DatePipe, FormsModule, BookComponent],
      providers: [
        { provide: BookService, useValue: bookService },
        {
          provide: NavigationDataServiceService,
          useValue: navigationDataService,
        },
        { provide: GetApiService, useValue: getApiService },
        { provide: SearchService, useValue: searchService },
        DatePipe,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize books and API books on ngOnInit', () => {
    expect(bookService.getBooks).toHaveBeenCalled();
    expect(getApiService.getBookFormApi).toHaveBeenCalled();

    expect(component.combined).toEqual([...mockBooks, ...mockApiBooks]);
    expect(bookService.addApiBooks).toHaveBeenCalledWith(mockApiBooks);
  });

  it('should filter books based on search term', () => {
    const searchTerm = mockBooks[0].title.split(' ')[0];
    searchQuerySubject.next(searchTerm);
    expect(component.combined).toEqual([mockBooks[0]]);

    searchQuerySubject.next('');
    expect(component.combined).toEqual([...mockBooks, ...mockApiBooks]);
  });

  it('should call editBook and navigate', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.editBook(0);
    expect(navigationDataService.setData).toHaveBeenCalledWith({
      bookToEdit: mockBooks[0],
      index: 0,
    });
    expect(routerSpy).toHaveBeenCalledWith(['/book-form']);
  });

  it('should call deleteBook and update books', () => {
    component.deleteBook(0);
    expect(bookService.deleteBook).toHaveBeenCalledWith(0);
  });

  it('should navigate to book form', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.navigateToBookForm();
    expect(routerSpy).toHaveBeenCalledWith(['/book-form']);
  });
});