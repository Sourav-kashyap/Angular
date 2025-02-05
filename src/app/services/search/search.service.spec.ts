import { TestBed } from '@angular/core/testing';
import { SearchService } from './search.service';
import { faker } from '@faker-js/faker';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update the search query and emit the new value', (done) => {
    const initialQuery = '';
    const newQuery = faker.lorem.words(3); // Generate a random query

    // Subscribe to the observable to listen for changes
    service.searchQuery$.subscribe((query) => {
      if (query !== initialQuery) {
        expect(query).toBe(newQuery);
        done(); // Signal that the asynchronous test is complete
      }
    });

    service.updateSearchQuery(newQuery); // Update the search query
  });

  it('should emit the initial value on subscription', (done) => {
    service.searchQuery$.subscribe((query) => {
      expect(query).toBe(''); // Expect the initial value
      done();
    });
  });
});

