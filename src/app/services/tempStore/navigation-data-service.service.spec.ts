import { TestBed } from '@angular/core/testing';

import { NavigationDataServiceService } from './navigation-data-service.service';

describe('NavigationDataServiceService', () => {
  let service: NavigationDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
