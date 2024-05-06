import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserSigninComponent } from './pages/user-signin/user-signin.component';
import { MainComponent } from './pages/main/main.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTokenComponent } from './pages/input-token/input-token.component';
import { MainMenuComponent } from './pages/main-menu/main-menu.component';
import { MenuListComponent } from './pages/menu-list/menu-list.component';
import { StockMenuComponent } from './pages/stock-menu/stock-menu.component';
import { ModalJenisMenuComponent } from './widgets/modal-jenis-menu/modal-jenis-menu.component';
import { JenisMenuComponent } from './pages/jenis-menu/jenis-menu.component';
import { DataKasirComponent } from './pages/data-kasir/data-kasir.component';
import { DataMenuComponent } from './pages/data-menu/data-menu.component';
import { DataTabelComponent } from './pages/data-tabel/data-tabel.component';
import { DashboardOrderComponent } from './pages/dashboard-order/dashboard-order.component';
import { StrukComponent } from './pages/struk/struk.component';

@NgModule({
  declarations: [
    AppComponent,
    UserSigninComponent,
    MainComponent,
    NotFoundComponent,
    UserRegisterComponent,
    InputTokenComponent,
    MainMenuComponent,
    MenuListComponent,
    StockMenuComponent,
    ModalJenisMenuComponent,
    JenisMenuComponent,
    DataKasirComponent,
    DataMenuComponent,
    DataTabelComponent,
    DashboardOrderComponent,
    StrukComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
