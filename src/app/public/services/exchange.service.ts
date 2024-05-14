import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ExchangeI } from '../models/exchange.interface';
import { OldExchangeI } from '../models/old_exchange.interface';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  constructor(private http: HttpClient) {}
  
  get_current_exchange(base_code:string, target_code:string): Observable<ExchangeI> {
    return this.http.get<ExchangeI>(environment.api_exchange_url+'/pair/'+ base_code +'/'+target_code);
  }

  get_previous_exchange(currency:string, year:number, month:number, day:number): Observable<OldExchangeI> {
    return this.http.get<OldExchangeI>(environment.api_exchange_url +'/history/'+ currency +'/'+ year +'/'+ month +'/'+ day);
  }
}

