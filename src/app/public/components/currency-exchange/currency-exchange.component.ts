import { Component, OnInit } from '@angular/core';
import { ExchangeService } from '../../services/exchange.service';
import { Currencies } from '../../models/currencies.enum';
import { Subscription, map, timer } from 'rxjs';
import { CurrencyPairI } from '../../models/currency_pair.interface';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-currency-exchange',
  templateUrl: './currency-exchange.component.html',
  styleUrl: './currency-exchange.component.scss'
})

export class CurrencyExchangeComponent implements OnInit {
  private interval_update = 60000;
  additional_currencies = [Currencies.CNY,Currencies.JPY, Currencies.TRY];
  clock:any;
  currencies:CurrencyPairI[] = [
    {base_code: Currencies.USD, target_code: Currencies.RUB, conversion_rate: 0, difference: 0},
    {base_code: Currencies.EUR, target_code: Currencies.RUB, conversion_rate: 0, difference: 0},
    {base_code: Currencies.GBP, target_code: Currencies.RUB, conversion_rate: 0, difference: 0}
  ];
  timerSubscription!: Subscription; 

  constructor(private exchangeService: ExchangeService, public datepipe: DatePipe){}
  
  ngOnInit(): void {
    setInterval(() => {
      this.clock = this.clock = this.datepipe.transform((new Date), 'dd/MM/yyyy hh:mm:ss a');
    }, 1000);

    let date_msec = Date.now() - (24 * 3600 * 1000);
    const dateObj = new Date(date_msec);
    let month = dateObj.getUTCMonth() + 1;
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear()
    for (let i = 0; i < this.currencies.length; i++){
      this.exchangeService.get_current_exchange(this.currencies[i].base_code, this.currencies[i].target_code).subscribe(
        result =>{
          this.currencies[i].conversion_rate = result.conversion_rate
          this.exchangeService.get_previous_exchange(this.currencies[i].base_code, year, month, day).subscribe(
            result =>{
              this.currencies[i].difference = Math.round(100000 * (this.currencies[i].conversion_rate - result.conversion_rates.RUB)) / 100000
              
            }
          )
        }
      )
    }

    // this.timerSubscription = timer(0, this.interval_update).pipe( 
    //   map(() => { 

    //   }) 
    // ).subscribe();
    
  }

  onClick(option:Currencies):void{
    let date_msec = Date.now() - (24 * 3600 * 1000);
    const dateObj = new Date(date_msec);
    let month = dateObj.getUTCMonth() + 1;
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear()
    let new_currency: CurrencyPairI = {base_code: option, target_code: Currencies.RUB, conversion_rate: 0, difference: 0};
    this.exchangeService.get_current_exchange(option, Currencies.RUB).subscribe(
      result =>{
        new_currency.conversion_rate = result.conversion_rate
        //console.log(result.conversion_rate)
        this.exchangeService.get_previous_exchange(option, year, month, day).subscribe(
          result =>{
            new_currency.difference = Math.round(100000 * (new_currency.conversion_rate - result.conversion_rates.RUB)) / 100000
            this.currencies.push(new_currency);
          }
        )
      }
    )
  }
  
}
