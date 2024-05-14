import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyExchangeComponent } from './components/currency-exchange/currency-exchange.component';
import { PublicComponent } from './components/public/public.component';

const routes: Routes = [

  {
    path: 'public',
    component: PublicComponent,
    children:[
      {
        path: 'exchange',
        component: CurrencyExchangeComponent
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'public/exchange',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }