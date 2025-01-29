import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { BookService } from '../../services/shared/book.service';
import { NavigationDataServiceService } from '../../services/tempStore/navigation-data-service.service';

@Component({
  selector: 'app-book-form',
  imports: [NavbarComponent, ReactiveFormsModule, NgFor],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css',
})
export class BookFormComponent implements OnInit {
  editIndex: number | null = null;

  constructor(
    private router: Router,
    private bookService: BookService,
    private navigationDataService: NavigationDataServiceService
  ) {}

  categories = [
    'Fiction',
    'Non-fiction',
    'Fantasy',
    'Science',
    'Biography',
    'History',
    'Horror',
    'Children',
    'Language Arts & Disciplines',
    'Literary Criticism',
    'Uncategorized',
    'Performing Arts',
    'Other',
  ];

  bookDetails: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    isbn: new FormControl('', [Validators.required, Validators.minLength(4)]),
    publishDate: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
  });

  ngOnInit() {
    if (this.navigationDataService.getIsData()) {
      console.log('3 coming form user -> ');
      const state = this.navigationDataService.getData();
      if (state) {
        this.editIndex = state.index;
        this.bookDetails.patchValue(state.bookToEdit);
        this.navigationDataService.clearData();
      }
    }
    if (this.navigationDataService.getIsApiData()) {
      console.log('3 coming form api -> ');

      const state = this.navigationDataService.getApiData();
      if (state) {
        this.editIndex = state.index;
        this.bookDetails.patchValue(state.bookToEdit);
        this.navigationDataService.clearApiData();
      }
    }
  }

  onSubmit() {
    const bookData = this.bookDetails.value;
    console.log('4 after edit ->', bookData);

    if (this.editIndex !== null) {
      console.log('5 if edit index valid means previous store data -> ');

      if (this.navigationDataService.getIsData()) {
        console.log('6 previous table form data -> ');
        this.bookService.updateBook(this.editIndex, bookData);
      }

      if (this.navigationDataService.getIsApiData()) {
        console.log('6 previous api data -> ');
        this.bookService.apiUpdateBook(this.editIndex, bookData);
      }
    } else {
      console.log('5 if edit index invalid means new Table data -> ');
      this.bookService.addBook(bookData);
    }
    this.router.navigate(['/display-books']);
  }
}