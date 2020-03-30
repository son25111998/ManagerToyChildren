import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HeaderHomeComponent } from './header-home/header-home.component';
import { FooterHomeComponent } from './footer-home/footer-home.component';
import {NgxPaginationModule} from 'ngx-pagination';;
import { AuthGuard } from './authentication/guard/auth.guard';
import { AppRoutingModule } from './app-routing.module';
import { AuthRoutingModule } from './authentication/auth-routing.module';
import { TranslateService } from '@ngx-translate/core';



@NgModule({
  declarations: [
    AppComponent,
     HeaderHomeComponent,
     FooterHomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgxPaginationModule,
    AppRoutingModule,
    AuthRoutingModule,
 
  ],
  providers: [AuthGuard,TranslateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
