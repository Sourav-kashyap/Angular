import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-book-form',
  imports: [NavbarComponent , FormComponent],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})
export class BookFormComponent {

}
