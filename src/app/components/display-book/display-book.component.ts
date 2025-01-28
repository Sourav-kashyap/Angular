import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { BookService } from '../../services/shared/book.service';
import { DatePipe, NgFor } from '@angular/common';
import {NavigationDataServiceService} from "../../services/tempStore/navigation-data-service.service"
@Component({
  selector: 'app-display-book',
  imports: [NavbarComponent,NgFor,DatePipe],
  templateUrl: './display-book.component.html',
  styleUrl: './display-book.component.css',
})
export class DisplayBookComponent implements OnInit{
  books:any[]=[];
  constructor(private router: Router, private bookService:BookService ,private navigationDataService:NavigationDataServiceService) {}
  
  calculateBookAge(publishDate:string):string {
  const publishedDate = new Date(publishDate);
  const currentDate = new Date();

  let years = currentDate.getFullYear() - publishedDate.getFullYear();
  let months = currentDate.getMonth() - publishedDate.getMonth();
  let days = currentDate.getDate() - publishedDate.getDate();

  if (days < 0) {
    const previousMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0 
    ).getDate();
    days += previousMonth;
    months--;
  }

  if (months < 0) {
    months += 12;
    years--;
  }
  return `${days} days, ${months} months, ${years} years `;
}

  ngOnInit(){
    this.books = this.bookService.getBooks();
  }

  editBook(index:number){
    const bookToEdit= this.books[index];
    this.navigationDataService?.setData({bookToEdit , index});
    this.router.navigate(['/book-form']);
  }
  
  deleteBook(index:number){
    this.bookService.deleteBook(index);
    this.books = this.bookService.getBooks();
  }
  
  navigateToBookForm() {
    this.router.navigate(['/book-form']); // Navigate to the book form page
  }

}
