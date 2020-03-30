import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from "angular2-datatable";
import { ResponseMessageModule } from '../../common/util/response-message/response-message.module';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { createTranslateLoader, CustomHandler } from '../../../i18n-setting';

import { AuthGuardSubmenu } from '../../../authentication/guard/auth.guard-submenu';

import { SelectModule } from 'ng2-select';
import { OperationHistoryListComponent } from './operation_history-list.component';
import { OperationHistoryDetailComponent } from './operation_history-detail/operation_history-detail.component';




const routes: Routes = [

  { path: '', component: OperationHistoryListComponent, pathMatch: 'full' },
  { path: 'detail/:id', component: OperationHistoryDetailComponent, pathMatch: 'full' },
  // { path: 'reference/:id/list', canActivate: [AuthGuardSubmenu], component: ProvinceRefListComponent, pathMatch: 'full' },
  // { path: 'reference/:business/:id', canActivate: [AuthGuardSubmenu], component: ProvinceRefBusinessComponent, pathMatch: 'full' },

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
    OperationHistoryListComponent,
    OperationHistoryDetailComponent
  ],
  exports: [RouterModule],
  providers: [AuthGuardSubmenu]
})
export class OperationHistoryModule { }
