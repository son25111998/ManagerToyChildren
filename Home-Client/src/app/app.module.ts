import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CitiesComponent } from './cities/cities.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShopComponent } from './shop/shop.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductSingleComponent } from './product-single/product-single.component';
import { ContactComponent } from './contact/contact.component';
import { BlogSingleComponent } from './blog-single/blog-single.component';
import { BlogComponent } from './blog/blog.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    CitiesComponent,
    HomepageComponent,
    ShoppingCartComponent,
    ShopComponent,
    CheckoutComponent,
    ProductSingleComponent,
    ContactComponent,
    BlogSingleComponent,
    BlogComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'cities', pathMatch: 'full' },
      { path: 'cities', component: CitiesComponent },
      { path: 'home', component: HomepageComponent },
      { path: 'cart', component: ShoppingCartComponent },
      { path: 'shop', component: ShoppingCartComponent },
      { path: 'singleproduct', component: ShoppingCartComponent },
      { path: 'checkout', component: ShoppingCartComponent }

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
