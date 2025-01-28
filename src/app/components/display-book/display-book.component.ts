import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { BookService } from '../../services/shared/book.service';
import { NgFor } from '@angular/common';
import {NavigationDataServiceService} from "../../services/tempStore/navigation-data-service.service"
@Component({
  selector: 'app-display-book',
  imports: [NavbarComponent,NgFor],
  templateUrl: './display-book.component.html',
  styleUrl: './display-book.component.css',
})
export class DisplayBookComponent implements OnInit{
  books:any[]=[];
  constructor(private router: Router, private bookService:BookService ,private navigationDataService:NavigationDataServiceService) {}
  ngOnInit(){
    this.books = this.bookService.getBooks();
  }

  editBook(index:number){
    console.log("1");
    const bookToEdit= this.books[index];
     console.log("2");
    this.navigationDataService?.setData({bookToEdit , index});
    this.router.navigate(['/book-form']);
     console.log("3");
  }
  
  deleteBook(index:number){
    this.bookService.deleteBook(index);
    this.books = this.bookService.getBooks();
  }
  
  navigateToBookForm() {
    this.router.navigate(['/book-form']); // Navigate to the book form page
  }
}
