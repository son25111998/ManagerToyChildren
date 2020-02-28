import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { AccountComponent } from './account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from "angular2-datatable";

import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { createTranslateLoader, CustomHandler } from '../../../i18n-setting';
import { HttpClient } from '@angular/common/http';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { AccountBusinessComponent } from './account-business/account-business.component';
import { ResponseMessageModule } from '../../common/util/response-message/response-message.module';
import { SelectModule } from 'ng2-select';
import { AccountService } from './account.service';

const routes: Routes = [

  { path: '', component: AccountComponent, pathMatch: 'full' },
  { path: 'detail/:id', component: AccountDetailComponent, pathMatch: 'full' },
  { path: ':business/:id', canActivate: [], component: AccountBusinessComponent, pathMatch: 'full' },
  { path: ':business', canActivate: [], component: AccountBusinessComponent, pathMatch: 'full' },
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
    AccountComponent,
    AccountBusinessComponent,
    AccountDetailComponent,

  ],
  exports: [RouterModule],
  providers: [AccountService]
})
export class AccountModule { }
