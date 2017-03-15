import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
// Routing Module
import { AppRoutingModule } from './app.routing';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
//Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { ModalModule } from 'ng2-bootstrap/modal';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';
import { NgModule } from '@angular/core';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { TabsModule } from 'ng2-bootstrap/tabs';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    DropdownModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    ChartsModule
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective
],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
