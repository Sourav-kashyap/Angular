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

  it('should set and get data correctly', () => {
    const testData = { name: 'Test Data' };
    service.setData(testData);
    expect(service.getData()).toEqual(testData);
    expect(service.getIsData()).toBeTrue();
  });

  it('should set and get API data correctly', () => {
    const testApiData = { id: 123, value: 'API Value' };
    service.setApiData(testApiData);
    expect(service.getApiData()).toEqual(testApiData);
    expect(service.getIsApiData()).toBeTrue();
  });

  it('should return correct isData value', () => {
    expect(service.getIsData()).toBeFalse(); // Initially false
    const testData = { name: 'Test Data' };
    service.setData(testData);
    expect(service.getIsData()).toBeTrue();
  });

  it('should return correct isApiData value', () => {
    expect(service.getIsApiData()).toBeFalse(); // Initially false
    const testApiData = { id: 123, value: 'API Value' };
    service.setApiData(testApiData);
    expect(service.getIsApiData()).toBeTrue();
  });
});