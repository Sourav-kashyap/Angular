import { Component } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { BookComponent } from '../book/book.component';


@Component({
  selector: 'app-search',
  imports: [NavbarComponent , SearchBarComponent , BookComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {}
