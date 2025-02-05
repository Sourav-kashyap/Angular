import { TestBed } from '@angular/core/testing';
import { BookService } from './book.service';
import { faker } from '@faker-js/faker';

describe('BookService', () => {
  let service: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a book', () => {
    const book = { title: faker.lorem.words(3), author: faker.person.fullName() };
    service.addBook(book);
    expect(service.getBooks().length).toBe(1);
    expect(service.getBooks()[0]).toEqual(book);
  });

  it('should get all books', () => {
    const book1 = { title: faker.lorem.words(3) };
    const book2 = { title: faker.lorem.words(3) };
    service.addBook(book1);
    service.addBook(book2);
    const books = service.getBooks();
    expect(books.length).toBe(2);
    expect(books[0]).toEqual(book1);
    expect(books[1]).toEqual(book2);
  });

  it('should update a book', () => {
    const book1 = { title: faker.lorem.words(3), author: faker.person.fullName() };
    const updatedBook1 = { title: faker.lorem.words(3), author: faker.person.fullName() };
    service.addBook(book1);
    service.updateBook(0, updatedBook1);
    expect(service.getBooks()[0]).toEqual(updatedBook1);
  });

  it('should not update a book with an invalid index', () => {
    const book1 = { title: faker.lorem.words(3) };
    const updatedBook1 = { title: faker.lorem.words(3) };
    service.addBook(book1);
    service.updateBook(5, updatedBook1); // Invalid index
    expect(service.getBooks()[0]).toEqual(book1); // Should not be updated
  });

  it('should delete a book', () => {
    const book1 = { title: faker.lorem.words(3) };
    const book2 = { title: faker.lorem.words(3) };
    service.addBook(book1);
    service.addBook(book2);
    service.deleteBook(0);
    expect(service.getBooks().length).toBe(1);
    expect(service.getBooks()[0]).toEqual(book2);
  });

  it('should not delete a book with an invalid index', () => {
    const book1 = { title: faker.lorem.words(3) };
    service.addBook(book1);
    service.deleteBook(5); // Invalid index
    expect(service.getBooks().length).toBe(1); // Should not be deleted
  });

  it('should add API books', () => {
    const apiBooks = [
      { title: faker.lorem.words(3) },
      { title: faker.lorem.words(3) }
    ];
    service.addApiBooks(apiBooks);
    expect(service.getApiBooks().length).toBe(2);
    expect(service.getApiBooks()).toEqual(apiBooks);
  });

  it('should get API books', () => {
    const apiBooks = [
      { title: faker.lorem.words(3) },
      { title: faker.lorem.words(3) }
    ];
    service.addApiBooks(apiBooks);
    const retrievedApiBooks = service.getApiBooks();
    expect(retrievedApiBooks).toEqual(apiBooks);
  });

  it('should update an API book', () => {
    const apiBook1 = { title: faker.lorem.words(3), author: faker.person.fullName() };
    const updatedApiBook1 = { title: faker.lorem.words(3), author: faker.person.fullName() };
    service.addApiBooks([apiBook1]);
    service.apiUpdateBook(0, updatedApiBook1);
    expect(service.getApiBooks()[0]).toEqual(updatedApiBook1);
  });

  it('should not update an API book with an invalid index', () => {
    const apiBook1 = { title: faker.lorem.words(3) };
    const updatedApiBook1 = { title: faker.lorem.words(3) };
    service.addApiBooks([apiBook1]);
    service.apiUpdateBook(5, updatedApiBook1); // Invalid index
    expect(service.getApiBooks()[0]).toEqual(apiBook1); // Should not be updated
  });

  it('should delete an API book', () => {
    const apiBook1 = { title: faker.lorem.words(3) };
    const apiBook2 = { title: faker.lorem.words(3) };
    service.addApiBooks([apiBook1, apiBook2]);
    service.apiDeleteBook(0);
    expect(service.getApiBooks().length).toBe(1);
    expect(service.getApiBooks()[0]).toEqual(apiBook2);
  });

  it('should not delete an API book with an invalid index', () => {
    const apiBook1 = { title: faker.lorem.words(3) };
    service.addApiBooks([apiBook1]);
    service.apiDeleteBook(5); // Invalid index
    expect(service.getApiBooks().length).toBe(1); // Should not be deleted
  });
});
