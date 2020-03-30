import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './authentication/guard/auth.guard';
import { AppComponent } from './app.component';




const routes: Routes = [
  {
    //canActivate: [AuthGuard],
    path: '',
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadChildren: './homepage/homepage.module#HomePageModule' },
      { path: 'shop', loadChildren: './shop/shop.module#ShopModule' },
      { path: 'cart', loadChildren: './shopping-cart/shoppingcart.module#ShoppingCartModule' },
      {path: 'single-product', loadChildren: './single-product/singleproduct.module#SingleProductModule'},
      {path: 'contact', loadChildren: './contact/contact.module#ContactModule'},
      {path: 'checkout', loadChildren: './checkout/checkout.module#CheckoutModule'},
      {path: 'blog', loadChildren: './blog/blog.module#BlogModule'},
      // {path: 'blogsigle', loadChildren: './blog-sigle/blogsigle.module#BlogsigleModule'},
      {path: 'about', loadChildren: './about/about.module#AboutModule'},
      { path: 'user-profile', loadChildren: '../am/user-info/user-info.module#UserInfoModule' },
      
    ]
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
