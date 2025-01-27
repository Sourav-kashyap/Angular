import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { DisplayBookComponent } from './components/display-book/display-book.component';

export const routes: Routes = [
    {path:'' , redirectTo:'home',pathMatch:'full'},
    {
        path:'home',component:HomeComponent
    },
    {
        path:'book-form',component:BookFormComponent
    },
    {
        path:'display-books',component:DisplayBookComponent
    }
];
