import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { BookService } from '../../services/shared/book.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-display-book',
  imports: [NavbarComponent,NgFor],
  templateUrl: './display-book.component.html',
  styleUrl: './display-book.component.css',
})
export class DisplayBookComponent implements OnInit{
  books:any[]=[];
  constructor(private router: Router, private bookService:BookService) {}
  ngOnInit(){
    this.books = this.bookService.getBook();
  }
  navigateToBookForm() {
    this.router.navigate(['/book-form']); // Navigate to the book form page
  }
}
