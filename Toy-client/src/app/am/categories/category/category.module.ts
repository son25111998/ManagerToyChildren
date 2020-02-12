import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { CategoryListComponent } from './category-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from "angular2-datatable";

import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { createTranslateLoader, CustomHandler } from '../../../i18n-setting';
import { Http } from '@angular/http';
import { CategoryDetailComponent } from './category-detail/category-detail.component';


import { SelectModule } from 'ng2-select';
import {CategoryBusinessComponent } from './category-business/category-business.component';
import { ResponseMessageModule } from '../../common/util/response-message/response-message.module';

const routes: Routes = [

  { path: '', component: CategoryListComponent, pathMatch: 'full' },
  { path: 'detail/:id', component: CategoryDetailComponent, pathMatch: 'full' },
  { path: ':business', canActivate: [], component: CategoryBusinessComponent, pathMatch: 'full' },
  { path: ':business/:id', canActivate: [], component: CategoryBusinessComponent, pathMatch: 'full' },
]

@NgModule({
  imports: [
    SelectModule,
    RouterModule.forChild(routes),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ResponseMessageModule,
    DataTableModule,
    ToastModule.forRoot(),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      },
      missingTranslationHandler: { provide: MissingTranslationHandler, useClass: CustomHandler },
      isolate: false
    })
  ],
  declarations: [
    CategoryListComponent,
    CategoryBusinessComponent,
    CategoryDetailComponent,
  ],
  exports: [RouterModule],
  providers: []
})
export class CategoryModule { }
