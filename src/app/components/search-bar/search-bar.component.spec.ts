import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from './search-bar.component';
import { SearchService } from '../../services/search/search.service';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let searchService: jasmine.SpyObj<SearchService>;

  beforeEach(async () => {
    searchService = jasmine.createSpyObj('SearchService', [
      'updateSearchQuery',
    ]);

    await TestBed.configureTestingModule({
      imports: [FormsModule, SearchBarComponent], // Import FormsModule
      providers: [{ provide: SearchService, useValue: searchService }],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update search query in the service on onSearch()', () => {
    const mockSearchQuery = 'test query';
    component.searchQuery = mockSearchQuery; // Set the search query in the component

    component.onSearch();

    expect(searchService.updateSearchQuery).toHaveBeenCalledWith(
      mockSearchQuery
    );
  });

  it('should bind the input value to searchQuery', () => {
    const inputElement = fixture.nativeElement.querySelector('input'); // Select the input element
    inputElement.value = 'another test query';
    inputElement.dispatchEvent(new Event('input')); 
    fixture.detectChanges(); 
    expect(component.searchQuery).toBe('another test query');
  });
});