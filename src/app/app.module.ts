import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent, BookReadComponent, BookListComponent } from './components';
import { AppService, RestService } from './services';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonFunctions } from './common/common.functions';
import { ReverseStr } from './pipes/reverseStr.pipe';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BookReadComponent,
    BookListComponent,
    ReverseStr
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ AppService, RestService, CommonFunctions],
  bootstrap: [AppComponent]
})
export class AppModule { }
