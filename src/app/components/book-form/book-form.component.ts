import { Component } from '@angular/core';
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

@Component({
  selector: 'app-book-form',
  imports: [NavbarComponent, ReactiveFormsModule, NgFor],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css',
})
export class BookFormComponent {
  constructor(private router: Router, private bookService: BookService) {}
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

  onSubmit() {
    if (this.bookDetails.valid) {
      this.bookService.addBook(this.bookDetails.value);

      this.router.navigate(['/display-books']);
    }
  }
}
