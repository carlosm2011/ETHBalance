# ETHBalance
ETH Balance using Web3 and Angular2

Requirements
Metamask
Node.js
Angular-Cli

To install Node.js:
Download the version for your system and choose the default options to complete the installation.

To install Metamask
Go to Metamask.io 
Get Chrome Plugin and add to browser

To install Angular CLI: 
Run npm install -g angular-cli in the command line

Create the project name Tutorial:

ng new Tutorial

To install web3 library:

cd Tutorial
npm install web3

To run it in the browswer:
ng serve --open

You may need to open in chrome if the application opens in IE

Press F12 and you should see that the message MetaMask - injected web3
**** Does this mean that I don't have to put an import statement in the folder where I'm going to use the functions from web3.

I'm going to create to create two custom components
-A menu component
Use the command ng g c Menu -is --spec false
-A Balance component

Now you must create the routes: 
In the menu.component.html 
place the following code
<div class="row">
   <div class="col-xs-12">
    <ul class="nav nav-pills">
     <li routerLinkActive="active"> <a [routerLink]="['/balance']" >Balance</a></li>
    </ul>
  </div>
 </div>

Map the url paths to the components:
Create a config file named app.routing.ts in the root module or folder called app, which is also the folder that contains your custom components

import { Routes, RouterModule } from '@angular/router';
import { CurrencyComponent } from "./balance/balance.component";
const MAINMENU_ROUTES: Routes = [
    //full : makes sure the path is absolute path
    { path: '', redirectTo: '/balance', pathMatch: 'full' },
    { path: 'balance', component: BalanceComponent }
];
export const CONST_ROUTING = RouterModule.forRoot(MAINMENU_ROUTES);

Now you need to link this view to its parent component, app.component.html

<div class="container">
 <app-menu></app-menu>
 <hr>
 <router-outlet></router-outlet>
</div>

Two items must be added to lines 11 and 35.
import { CONST_ROUTING } from './app.routing'; 
and
CONST_ROUTING

Now you can run the application and click the balance link

Next you must create a service using the command
ng g service Shared --spec false
 
Now replace the content of shared.service.ts with:


import { Injectable } from '@angular/core';
import 'web3'
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs";

@Injectable()
export class SharedService {
	currencyURL = "http://api.fixer.io/latest?symbols="; 
    totReqsMade: number = 0;
	constructor(private _http: Http) { }

getBalance(PubAd) { 
        this.totReqsMade = this.totReqsMade + 1; 
        return this._http.get(this.currencyURL + PubAd)
            .map(response => {
                { return response.json() };
            })
            .catch(error => Observable.throw(error.json()));
    }
}

The Balance.component.ts file should be replaced with the following:

import { Component, OnInit } from '@angular/core';
import { SharedService } from "./../shared.service";
 
@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styles: [] 
})
export class BalanceComponent implements OnInit {
  
  id_currency: string = "";
  my_result: any;
  constructor(private _sharedService: SharedService) {
  }
 
  ngOnInit() {
  }
 
  callBalanceService() {  
    this._sharedService.getBalance(this.id_currency.toUpperCase())
      .subscribe(
      lstresult => { 
                this.my_result = JSON.stringify(lstresult); 
      },
      error => {
        console.log("Error. The callBalanceService result JSON value is as follows:");
        console.log(error);
      }
      ); 
  }
}

The app.module.ts file with:

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


The balance.component.html file with:
<h2>Your Ethereum Balance!</h2>
<div class="col-md-8 col-md-offset-2">
 <div class="form-group">
  <input type="text" [(ngModel)]="id_currency" (change)="callBalanceService()" class="form-control" placeholder="Enter your public Ethereum Address">
  <br><br>
  <h3>Rate Details</h3>
  <br>
  <p class="well lead">Exchange rate relative to Euro in a JSON format: : {{ this.my_result }} </p>
  <p class="text-info">Total # of all the service requests including Just Ethereum Address is :
    <span class="badge">{{this._sharedService.totReqsMade}}</span>
  </p>
 </div>
</div>

Your Index.html file should have be replaced with to make it look nicer using bootstrap

<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Tutorial</title>
  <base href="/">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root></app-root>
</body>
</html>


