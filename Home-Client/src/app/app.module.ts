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
import { HeaderHomeComponent } from './header-home/header-home.component';
import { FooterHomeComponent } from './footer-home/footer-home.component';
import { ProductserviceService } from './homepage/productservice.service';
import { LoginComponent } from './login/login.component';

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
    AboutComponent,
    HeaderHomeComponent,
    FooterHomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      // { path: 'cities', component: CitiesComponent },
      { path: 'home', component: HomepageComponent },
      { path: 'cart', component: ShoppingCartComponent },
      { path: 'shop', component: ShopComponent },
      { path: 'singleproduct', component: ShoppingCartComponent },
      { path: 'checkout', component: ProductSingleComponent }

    ])
  ],
  providers: [ProductserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
