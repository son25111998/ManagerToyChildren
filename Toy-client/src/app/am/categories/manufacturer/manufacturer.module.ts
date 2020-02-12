import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from "angular2-datatable";
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { createTranslateLoader, CustomHandler } from '../../../i18n-setting';
import { HttpClient } from '@angular/common/http';

import { ManufacturerBusinessComponent } from './manufacturer-business/manufacturer-business.component';
import { ManufacturerListComponent } from './manufacturer-list.component';
import { ManufacturerDetailComponent } from './manufacturer-detail/manufacturer-detail.component';

import { SelectModule } from 'ng2-select';
const routes: Routes = [

  { path: '', component: ManufacturerListComponent, pathMatch: 'full' },
  { path: 'detail/:id', component: ManufacturerDetailComponent, pathMatch: 'full' },
  { path: ':business/:id', canActivate: [], component: ManufacturerBusinessComponent, pathMatch: 'full' },
  { path: ':business', canActivate: [], component: ManufacturerBusinessComponent, pathMatch: 'full' },
]

@NgModule({
  imports: [
    SelectModule,
    RouterModule.forChild(routes),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    DataTableModule,
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
    ManufacturerListComponent,
    ManufacturerBusinessComponent,
    ManufacturerDetailComponent,
    ManufacturerDetailComponent,
    ManufacturerListComponent,
  ],
  exports: [RouterModule],
  providers: []
})
export class ManufacturerModule { }
