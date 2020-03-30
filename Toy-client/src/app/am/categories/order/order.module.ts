import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { OrderComponent } from './order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from "angular2-datatable";

import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { createTranslateLoader, CustomHandler } from '../../../i18n-setting';
import { HttpClient } from '@angular/common/http';

import { ResponseMessageModule } from '../../common/util/response-message/response-message.module';
import { SelectModule } from 'ng2-select';
import { OrderDetailComponent } from './order-detail/order-detail.component';

const routes: Routes = [

  { path: '', component: OrderComponent, pathMatch: 'full' },
   { path: 'detail/:id', component: OrderDetailComponent, pathMatch: 'full' },
//   { path: ':business/:id', canActivate: [], component: ProductBusinessComponent, pathMatch: 'full' },
//   { path: ':business', canActivate: [], component: ProductBusinessComponent, pathMatch: 'full' },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ResponseMessageModule,
    DataTableModule,
    SelectModule,
    ToastModule.forRoot(),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      missingTranslationHandler: { provide: MissingTranslationHandler, useClass: CustomHandler },
      isolate: false
    })
  ],
  declarations: [
    OrderComponent,
    OrderDetailComponent,
  ],
  exports: [RouterModule],
  providers: []
})
export class OrderModule { }
