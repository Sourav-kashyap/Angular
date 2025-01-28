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
    'fiction',
    'non-fiction',
    'fantasy',
    'science',
    'biography',
    'history',
    'horror',
    'children',
    'other',
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
    const state = this.navigationDataService.getData();
    console.log('temp data -> ', state);
    if (state) {
      this.editIndex = state.index;
      this.bookDetails.patchValue(state.bookToEdit);
      this.navigationDataService.clearData();
    }
  }

  onSubmit() {
    if (this.editIndex !== null) {
      this.bookService.updateBook(this.editIndex, this.bookDetails.value);
    } else {
      this.bookService.addBook(this.bookDetails.value);
    }
    this.router.navigate(['/display-books']);
  }
}
