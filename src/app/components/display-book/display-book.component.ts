import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { BookComponent } from '../book/book.component';

@Component({
  selector: 'app-display-book',
  imports: [NavbarComponent,BookComponent],
  templateUrl: './display-book.component.html',
  styleUrl: './display-book.component.css'
})
export class DisplayBookComponent {

}
