import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-book',
  imports: [NavbarComponent],
  templateUrl: './display-book.component.html',
  styleUrl: './display-book.component.css',
})
export class DisplayBookComponent {
  constructor(private router: Router) {}
  navigateToBookForm() {
    this.router.navigate(['/book-form']); // Navigate to the book form page
  }
}
