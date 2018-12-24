import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { HeaderInterceptorService } from './services/header-interceptor/header-interceptor.service';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
    { path: '', component: MainMenuComponent},
    { path: 'login', component: LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    HeaderComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
        appRoutes,
        { enableTracing: false }
    )
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
