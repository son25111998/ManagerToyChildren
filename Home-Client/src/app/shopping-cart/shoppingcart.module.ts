import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { createTranslateLoader, CustomHandler } from '../i18n-setting';
import { HttpClient } from '@angular/common/http';

import { ResponseMessageModule } from '../util/response-message/response-message.module';
import {NgxPaginationModule} from 'ngx-pagination';

import { ShoppingCartComponent } from './shopping-cart.component';

const routes: Routes = [

  { path: '', component: ShoppingCartComponent,pathMatch:"full"},
  { path: '/:id', canActivate: [], component: ShoppingCartComponent, pathMatch: 'full' },

]


@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ResponseMessageModule,
    NgxPaginationModule,
    

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
    ShoppingCartComponent
  ],
  exports: [RouterModule],
  providers: []
})
export class ShoppingCartModule { }
