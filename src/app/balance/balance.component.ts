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