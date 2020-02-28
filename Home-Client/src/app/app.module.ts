import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CitiesComponent } from './cities/cities.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShopComponent } from './shop/shop.component';
import { CheckoutComponent } from './checkout/checkout.component';

import { ContactComponent } from './contact/contact.component';
import { BlogSingleComponent } from './blog-single/blog-single.component';
import { BlogComponent } from './blog/blog.component';
import { AboutComponent } from './about/about.component';
import { HeaderHomeComponent } from './header-home/header-home.component';
import { FooterHomeComponent } from './footer-home/footer-home.component';
import { ProductserviceService } from './homepage/productservice.service';
import { LoginComponent } from './login/login.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './authentication/guard/auth.guard';
import { AmComponent } from './am/am.component';
import{HomepageComponent} from './homepage/homepage.component';


// import { TranslateService } from '@ngx-translate/core';
const routes: Routes = [
  {
    path: 'cart',component :ShoppingCartComponent,
    canActivate: [AuthGuard],

  }

];

@NgModule({
  declarations: [
    AppComponent,
    CitiesComponent,
    ShoppingCartComponent,
    ShopComponent,
    CheckoutComponent,
    ContactComponent,
    BlogSingleComponent,
    BlogComponent,
    AboutComponent,
    HeaderHomeComponent,
    FooterHomeComponent,
    LoginComponent,
    HomepageComponent,
    AmComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgxPaginationModule,
    RouterModule.forChild(routes),
    
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      // { path: 'cities', component: itiesComponent },
      { path: 'home', component: HomepageComponent },
      { path: 'login', component: LoginComponent },
      { path: 'shop', component: ShopComponent },
      // { path: 'singleproduct', component: ProductSingleComponent},
      { path: 'checkout', component: CheckoutComponent },
      { path: 'login', component: LoginComponent }

    ])
  ],
  providers: [AuthGuard,ProductserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
