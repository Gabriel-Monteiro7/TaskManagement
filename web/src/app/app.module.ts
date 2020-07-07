import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { LottieModule } from 'ngx-lottie';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { LogonComponent } from './pages/logon/logon.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LottieComponent } from './components/lottie/lottie.component';
import { ButtonTopComponent } from './components/button-top/button-top.component';
import { RegisterComponent } from './pages/register/register.component';

export function playerFactory() {
  return import('lottie-web');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    LogonComponent,
    PageNotFoundComponent,
    LottieComponent,
    ButtonTopComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    [LottieModule.forRoot({ player: playerFactory })],
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
