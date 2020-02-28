
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AmComponent } from './am.component';
import { AuthGuard } from '../authentication/guard/auth.guard';

const routes: Routes = [
  {
    path: '',component :AmComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadChildren: './common/shared/home/home.module#HomeModule'  },
      //categories
      { path: 'product', loadChildren: './categories/product/product.module#ProductModule' },
      { path: 'category', loadChildren: './categories/category/category.module#CategoryModule' },
      { path: 'manufacturer', loadChildren: './categories/manufacturer/manufacturer.module#ManufacturerModule' },
      { path: 'account', loadChildren: './categories/account/account.module#AccountModule' },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AmRoutingModule { }
