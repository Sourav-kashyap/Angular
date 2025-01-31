
// src/app/components/search-bar/search-bar.component.ts
import { Component } from '@angular/core';
import { SearchService } from '../../services/search/search.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  searchQuery: string = '';
  constructor(private searchService: SearchService) {}
  onSearch() {
    this.searchService.updateSearchQuery(this.searchQuery);
  }
}
