import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LogSystemModule } from './pages/log-system/log-system.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LogService } from './pages/log-system/service/log.service';
import { DefaultInterceptor } from './interceptors/default.interceptor';
import { FormsModule } from '@angular/forms';
import { Page404Component } from './components/page404/page404.component';
import { MobileComponent } from './components/navbar/components/mobile/mobile.component';
import { DesktopComponent } from './components/navbar/components/desktop/desktop.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    Page404Component,
    MobileComponent,
    DesktopComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LogSystemModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    LogService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DefaultInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
