
// src/app/services/shared/search.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchQuerySource = new BehaviorSubject<string>('');
  searchQuery$ = this.searchQuerySource.asObservable();
  updateSearchQuery(query: string) {
    this.searchQuerySource.next(query);
  }
}