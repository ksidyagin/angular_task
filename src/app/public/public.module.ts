import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { CurrencyExchangeComponent } from './components/currency-exchange/currency-exchange.component';
import { PublicComponent } from './components/public/public.component';
import { ExchangeService } from './services/exchange.service';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  declarations: [CurrencyExchangeComponent,PublicComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    MatButtonModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  providers:[ExchangeService, DatePipe]
})
export class PublicModule { }
