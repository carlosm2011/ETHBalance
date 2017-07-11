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



    
 

