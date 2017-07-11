import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { BalanceComponent } from './balance/balance.component';
import { CONST_ROUTING } from './app.routing'; 
import { SharedService } from "./shared.service";
 

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    BalanceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CONST_ROUTING


  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
