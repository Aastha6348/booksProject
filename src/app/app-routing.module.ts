import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent, BookReadComponent, BookListComponent } from './components';

const routes: Routes = [
  {
    path: '', 
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }, 
  {
    path: 'dashboard', 
    component: DashboardComponent
  },
  {
    path:'book-read', 
    component: BookReadComponent
  },
  {
    path:'bookList', 
    component: BookListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
